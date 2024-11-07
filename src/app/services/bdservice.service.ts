import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Usuario } from './usuario';
import { Juego } from './juego';
import emailjs from '@emailjs/browser';
import { AlertserviceService } from './alertservice.service';
import { Router } from '@angular/router';
/* import * as bcrypt from 'bcryptjs'; */





@Injectable({
  providedIn: 'root'
})
export class BdserviceService {

  public database! : SQLiteObject;

  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL UNIQUE, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL, fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP, id_rol INTEGER, edad INTEGER, imagen BLOB,esta_bloqueado BOOLEAN DEFAULT FALSE, FOREIGN KEY(id_rol) REFERENCES rol (id_rol));";

  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol(id_rol INTEGER PRIMARY KEY AUTOINCREMENT,nombre TEXT NOT NULL);";

  tablaJuego : string = "CREATE TABLE IF NOT EXISTS juego( id_juego INTEGER PRIMARY KEY AUTOINCREMENT, nombre_juego TEXT NOT NULL, precio INTEGER NOT NULL, id_plataforma INTEGER, id_categoria INTEGER, descripcion TEXT , imagen BLOB, FOREIGN KEY (id_plataforma) REFERENCES plataforma (id_plataforma), FOREIGN KEY (id_categoria) REFERENCES categoria (id_categoria));";

  /* tablaCarro : string = "CREATE TABLE IF NOT EXISTS carro( id_carro INTEGER PRIMARY KEY AUTOINCREMENT, id_usuario INTEGER, id_juego INTEGER, fecha_agregado DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario), FOREIGN KEY (id_juego) REFERENCES juego (id_juego));"; */
  
  tablaEstado : string = "CREATE TABLE IF NOT EXISTS estado_compra (id_estado INTEGER PRIMARY KEY AUTOINCREMENT,nombre_estado TEXT NOT NULL);"

  tablaCompra : string = "CREATE TABLE IF NOT EXISTS compra( id_compra INTEGER PRIMARY KEY AUTOINCREMENT, id_usuario INTEGER, fecha_compra DATETIME DEFAULT CURRENT_TIMESTAMP, total INTEGER,id_estado NUMBER, FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario), FOREIGN KEY (id_estado) REFERENCES estado_compra(id_estado));";

  tablaDetalleCompra : string = "CREATE TABLE IF NOT EXISTS detalle_compra ( id_detalle INTEGER PRIMARY KEY AUTOINCREMENT, id_compra INTEGER, id_juego INTEGER, subtotal INTEGER, FOREIGN KEY (id_compra) REFERENCES compra (id_compra), FOREIGN KEY (id_juego) REFERENCES juego (id_juego));";

  tablaListaDeseados : string = "CREATE TABLE IF NOT EXISTS lista_deseados (id_lista INTEGER PRIMARY KEY AUTOINCREMENT, id_usuario INTEGER, id_juego INTEGER, fecha_agregado DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario), FOREIGN KEY (id_juego) REFERENCES juego (id_juego));";

  tablaPlataforma : string = "CREATE TABLE IF NOT EXISTS plataforma (id_plataforma INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL);";

  tablaCategoria : string = "CREATE TABLE IF NOT EXISTS categoria(id_categoria INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL);";

  //insert por default

  registroRolCliente : string = "INSERT OR IGNORE INTO rol(id_rol, nombre) VALUES (1, 'Cliente');";
  registroRolAdmin: string = "INSERT OR IGNORE INTO rol(id_rol, nombre) VALUES (2, 'Admin');";

  registroEstadoCarro : string = "INSERT OR IGNORE INTO estado_compra(id_estado,nombre_estado) VALUES (1,'Carro');"
  registroEstadoCompra : string = "INSERT OR IGNORE INTO estado_compra(id_estado,nombre_estado) VALUES (2,'Compra');"

  registroPlataformaSteam : string = "INSERT OR IGNORE INTO plataforma(id_plataforma,nombre) VALUES(1,'Steam');"
  registroPlataformaPlay : string = "INSERT OR IGNORE INTO plataforma(id_plataforma,nombre) VALUES(2,'Playstation');"
  registroPlataformaXbox : string = "INSERT OR IGNORE INTO plataforma(id_plataforma,nombre) VALUES(3,'Xbox');"
  registroPlataformaSwitch : string = "INSERT OR IGNORE INTO plataforma(id_plataforma,nombre) VALUES(4,'Switch');"

  registroCategoriaAccion : string = "INSERT OR IGNORE INTO categoria(id_categoria,nombre) VALUES(1,'Accion');"
  registroCategoriaRPG : string = "INSERT OR IGNORE INTO categoria(id_categoria,nombre) VALUES(2,'RPG');"
  registroCategoriaDeportes : string = "INSERT OR IGNORE INTO categoria(id_categoria,nombre) VALUES(3,'Deportes');"
  registroCategoriaAventura : string = "INSERT OR IGNORE INTO categoria(id_categoria,nombre) VALUES(4,'Aventura');"

  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private rolCambioSubject = new Subject<void>();
  rolCambio$ = this.rolCambioSubject.asObservable();
  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);
  usuario$ = this.usuarioSubject.asObservable();
  usuariodb = new BehaviorSubject(Usuario);
  private usuarioBD = new BehaviorSubject<Usuario | null>(null); 
  private juegoBD = new BehaviorSubject<Juego | null>(null); 
  listaUsuarios = new BehaviorSubject([]);
  listaJuegos = new BehaviorSubject([]);
  listaJuegosRandom = new BehaviorSubject([]);
  listaCategoria = new BehaviorSubject([]);
  listaPlataforma= new BehaviorSubject([]);
  listaCarro = new BehaviorSubject<any[]>([])
  listaCompras = new BehaviorSubject<any[]>([])
  listaDeseados = new BehaviorSubject<any[]>([])
  totalCarro = new BehaviorSubject<number>(0); //se inicializa en 0 pero o se cambia o f



  constructor(private sqlite: SQLite, private platform: Platform, private alertController : AlertController,private alerta: AlertserviceService,private router : Router) {
    this.crearBD();


   }

   

   fetchTotal(): Observable<number> {
    return this.totalCarro.asObservable();
  }

  fetchCompras(): Observable<any[]>{
    return this.listaCompras.asObservable();
  }

  fetchDeseados():Observable<any[]>{
    return this.listaDeseados.asObservable();
  }
  

   fetchCarro(): Observable<any[]>{
    return this.listaCarro.asObservable();
   }

   fetchJuegos(): Observable<Juego[]>{
    return this.listaJuegos.asObservable();
   }
   fetchJuegosRandom(): Observable<Juego[]>{
    return this.listaJuegosRandom.asObservable();
   }
   fetchJuegosByCategoria(): Observable<Juego[]>{
    return this.listaCategoria.asObservable();
   }
   fetchJuegosByPlataforma(): Observable<Juego[]>{
    return this.listaPlataforma.asObservable();
   }

   fetchUsuario(): Observable<Usuario| null>{
    return this.usuarioBD.asObservable();

   } 
   fetchJuegoById(): Observable<Juego| null>{
    return this.juegoBD.asObservable();

   } 

   setUsuario(usuario: Usuario | null) {
    this.usuarioSubject.next(usuario);
   }



   crearBD(){
    this.platform.ready().then(()=>{
      
      this.sqlite.create({
        name: 'bdgamestore.db',
        location: 'default'
      }).then((bd: SQLiteObject)=>{

        this.database = bd;

        //aqui se pone para crear tablas
        this.crearTablas();

        //

        this.isDBReady.next(true);


      }).catch(error=>{
        this.presentAlert('Crear DB','Error : '+ JSON.stringify(error));
      })
    })
   }
   



   async crearTablas(){

    try{

      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaPlataforma, []);
      await this.database.executeSql(this.tablaCategoria, []);
      await this.database.executeSql(this.tablaUsuario, []);
      await this.database.executeSql(this.tablaJuego, []);
      await this.database.executeSql(this.tablaEstado, []);
      await this.database.executeSql(this.tablaCompra, []);
      await this.database.executeSql(this.tablaDetalleCompra, []);
      await this.database.executeSql(this.tablaListaDeseados, []);

      //INSERT por default aqui
      await this.database.executeSql(this.registroRolCliente,[]);
      await this.database.executeSql(this.registroRolAdmin,[]);

      await this.database.executeSql(this.registroEstadoCarro,[]);
      await this.database.executeSql(this.registroEstadoCompra,[]);

      await this.database.executeSql(this.registroPlataformaSteam,[]);
      await this.database.executeSql(this.registroPlataformaPlay,[]);
      await this.database.executeSql(this.registroPlataformaXbox,[]);
      await this.database.executeSql(this.registroPlataformaSwitch,[]);

      await this.database.executeSql(this.registroCategoriaAccion,[]);
      await this.database.executeSql(this.registroCategoriaRPG,[]);
      await this.database.executeSql(this.registroCategoriaDeportes,[]);
      await this.database.executeSql(this.registroCategoriaAventura,[]);


    }catch(error){
      this.presentAlert('Crear Tablas','Error : '+ JSON.stringify(error));
      
    }
   }

   async presentAlert(titulo: string,mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }


  dbState(){
    return this.isDBReady.asObservable();
  }


  async borrarUsuarios() {
    try {
      await this.database.executeSql('DELETE FROM usuario', []);
      console.log('Todos los usuarios han sido eliminados.');
    } catch (error) {
      this.presentAlert('Error al borrar usuarios', 'Error: ' + JSON.stringify(error));
    }
  }

  fetchUsuarios(): Observable<Usuario[]>{
    return this.listaUsuarios.asObservable();
  }



  async registroUsuario(nombre: string, email: string, password: string): Promise<boolean>{

    const rolCliente = 1;

    return new Promise<boolean>((resolve, reject) => {
      this.database.executeSql('INSERT INTO usuario(nombre, email, password, id_rol) VALUES (?,?,?,?);', [nombre, email, password, rolCliente])
        .then(() => {
          resolve(true);
        })
        .catch(error => {
          if (error.message.includes('UNIQUE constraint failed')) {
            this.presentAlert('Registro', 'El correo electrónico/Nombre de usuario ya está registrado.');
          } else {
            this.presentAlert('Registro', 'Error: ' + JSON.stringify(error));
          }
          resolve(false); 
        });
    });

  
  }

  async bloquearUsuario(id_usuario: number) {
    try {
      const res = await this.database.executeSql("SELECT esta_bloqueado FROM usuario WHERE id_usuario = ?", [id_usuario]);
  
      if (res.rows.length > 0) {
        if (res.rows.item(0).esta_bloqueado === 'true') {
          this.alerta.presentToast('Este usuario ya está bloqueado!');
          return;
        }

        await this.database.executeSql("UPDATE usuario SET esta_bloqueado = ? WHERE id_usuario = ?", [true, id_usuario]);
        this.alerta.presentToast('Usuario bloqueado con éxito!');

        const usuario = Number(localStorage.getItem('usuarioId'));

        if(usuario===id_usuario){
          localStorage.clear()
          this.router.navigate(['/login']);
        }
      } else {
        this.alerta.presentToast('Usuario no encontrado.');
      }
    } catch (error) {
      console.error('Error al bloquear el usuario:', error);
      this.alerta.presentAlert('error al bloquear',': '+JSON.stringify(error))
      this.alerta.presentToast('Ocurrió un error al intentar bloquear al usuario.');
    }
  }

  async desbloquearUsuario(id_usuario: number) {
    try {
      const res = await this.database.executeSql("SELECT esta_bloqueado FROM usuario WHERE id_usuario = ?", [id_usuario]);
  
      if (res.rows.length > 0) {
        if (res.rows.item(0).esta_bloqueado === 'false') {
          this.alerta.presentToast('No puedes desbloquear un usuario que no está bloqueado!');
          return;
        }
        await this.database.executeSql("UPDATE usuario SET esta_bloqueado = ? WHERE id_usuario = ?", [false, id_usuario]);
        this.alerta.presentToast('Usuario desbloqueado con éxito!');
      } else {
        this.alerta.presentToast('Usuario no encontrado.');
      }
    } catch (error) {
      console.error('Error al desbloquear el usuario:', error);
      this.alerta.presentAlert('error al desbloquear',': '+JSON.stringify(error))
    }
  }

  async darAdmin(id_usuario : number){
    try{
      const res = await this.database.executeSql("SELECT id_rol, esta_bloqueado FROM usuario WHERE id_usuario = ?;",[id_usuario]);

        if(res.rows.length>0){
          if(res.rows.item(0).id_rol === 2){
            this.alerta.presentToast('Este usuario ya es admin!')
            return;
          }

          if(res.rows.item(0).esta_bloqueado === 'true'){
            this.alerta.presentToast('No puedes volver administrador a un usuario bloqueado!');
            return;
          }
          await this.database.executeSql("UPDATE usuario SET id_rol = 2 WHERE id_usuario = ?",[id_usuario]);
          this.alerta.presentToast('Derechos de administrador concedidos!')
          this.rolCambioSubject.next(); 
          this.adminUsuarios();
        }else{
          this.alerta.presentToast('Usuario no encontrado. ')
        }
    }catch (error) {
      console.error('Error al volver admin al usuario:', error);
      this.alerta.presentAlert('error al volver admin',': '+JSON.stringify(error))
    }
  }

  async revocarAdmin(id_usuario : number){
    try{
      const res = await this.database.executeSql("SELECT id_rol, esta_bloqueado FROM usuario WHERE id_usuario = ?;",[id_usuario]);

        if(res.rows.length>0){
          if(res.rows.item(0).id_rol === 1){
            this.alerta.presentToast('Este usuario no es administrador!')
            return;
          }

          if(res.rows.item(0).esta_bloqueado === 'true'){
            this.alerta.presentToast('Este usuario esta bloqueado! No puedes hacer esto.');
            return;
          }
          await this.database.executeSql("UPDATE usuario SET id_rol = 1 WHERE id_usuario = ?",[id_usuario]);
          this.alerta.presentToast('Derechos de administrador revocados!')
          this.adminUsuarios();
          const usuario = Number(localStorage.getItem('usuarioId'));

          if(usuario===id_usuario){
            localStorage.clear()
            this.router.navigate(['/login']);
            
          }
        }else{
          this.alerta.presentToast('Usuario no encontrado. ')
        }
    }catch (error) {
      console.error('Error al quitar admin al usuario:', error);
      this.alerta.presentAlert('error al quitar admin',': '+JSON.stringify(error))
    }
  }



  async verificarLogin(usuario: string, password: string): Promise<boolean> {
    try {
      const resultado = await this.database.executeSql("SELECT *, esta_bloqueado FROM usuario WHERE nombre = ?", [usuario]);
      
      if (resultado.rows.length > 0) {
        const user = resultado.rows.item(0);
  
        console.log('Estado de bloqueo del usuario:', user.esta_bloqueado); // Mensaje de depuración
  
        if (user.esta_bloqueado === 'true') {
          this.alerta.presentToast('Este usuario está bloqueado. No puedes iniciar sesión.');
          return false;
      }
        
        if (user.password === password) {
          localStorage.setItem('rolUsuario', user.id_rol.toString());
          localStorage.setItem('usuarioId', user.id_usuario.toString());
          localStorage.setItem('authToken', user.id_usuario.toString());
          this.rolCambioSubject.next();
          this.alerta.presentToast('Inicio de sesión exitoso!');
          return true;
        } else {
          this.alerta.presentToast('Contraseña incorrecta.');
        }
  
      } else {
        this.alerta.presentToast('Usuario no encontrado.');
      }
  
    } catch (error) {
      console.error('Error al verificar el inicio de sesión:', error);
      this.alerta.presentToast('Error: ' + JSON.stringify(error));
    }
    return false;
  }


  checkCorreo(correo: string){
    
    return this.database.executeSql("SELECT email, esta_bloqueado FROM usuario WHERE email = ?",[correo])
    .then((res)=>{

      if(res.rows.length > 0){
        const user = res.rows.item(0);

        if (user.esta_bloqueado === true) {
          this.alerta.presentToast('No puedes solicitar recuperación de contraseña, tu cuenta está bloqueada.');
          return { existe: false };
        }
        const codigo = this.generarCodigoVerificacion();
        this.enviarCodigoPorCorreo(correo, codigo)
        localStorage.setItem('correoRecuperacion',correo)
        localStorage.setItem('codigoRecuperacion',codigo)

        return {existe: true, codigo : codigo};

      }else{
        return {existe : false};
      }

    })

  }

  generarCodigoVerificacion() {
    return Math.floor(100000 + Math.random() * 900000).toString(); 
  }

  enviarCodigoPorCorreo(correo: string, codigo: string) {
    const templateParams = {
      to_name: 'Usuario', 
      message: `Tu código de verificación es: ${codigo}`,
      user_email: correo,
      reply_to: correo,
    };

    return emailjs.send('service_kt017pz', 'template_vy9kddg', templateParams, 'FBM9iEWFlLNDDhL_P')
      .then((response) => {
        console.log('Código enviado con éxito!', response.status, response.text);
      })
      .catch((error) => {
        console.error('Error al enviar el código:', error);
        throw error;
      });
  }

  async updatePasswordRecuperacion(correo : string,password : string){
    await this.database.executeSql('UPDATE usuario SET password = ? WHERE email = ?;',[password,correo])
    .then((res)=>{
      this.alerta.presentAlert('Cambio exitoso!','Inicia sesion ahora')
    })
    .catch((error)=>{
      this.presentAlert('recuperacion','error en el cambio : '+JSON.stringify(error));
    })

  }

  async getUsuario(idUsuario: number)  {
    
      await this.database.executeSql('SELECT * FROM usuario WHERE id_usuario = ?', [idUsuario])
       .then((resultado=>{

        if (resultado.rows.length > 0) {

          const edadUsuario = resultado.rows.item(0).edad;
          const usuario: Usuario = new Usuario(
            resultado.rows.item(0).id_usuario,
            resultado.rows.item(0).email,
            resultado.rows.item(0).nombre,
            resultado.rows.item(0).id_rol,
            resultado.rows.item(0).edad,
            resultado.rows.item(0).imagen
        );
          this.usuarioBD.next(usuario);

      }
       })).catch(error=>{
        this.presentAlert('Error bd : ','este error es : '+ JSON.stringify(error));
        return null; 
       })

       
}

async adminUsuarios(){
  return this.database.executeSql("SELECT * FROM usuario;",[]).then((res=>{

    let items : Usuario[] = [];

    if(res.rows.length>0){
      for(var i = 0; i < res.rows.length; i++){
        items.push({
          idUsuario : res.rows.item(i).id_usuario,
          email : res.rows.item(i).email,
          nombre : res.rows.item(i).nombre,
          id_rol : res.rows.item(i).id_rol
        })
      }
    }
    this.listaUsuarios.next(items as any);


  })).catch((error)=>{
    this.presentAlert('error admin users','error : '+ JSON.stringify((error)));
  })


}


  async updatePassword(idUsuario : number,password : string,passwordActual : string){

    this.database.executeSql("SELECT password FROM usuario WHERE id_usuario = ?",[idUsuario])
    .then((res)=>{
      if(res.rows.length>0){
        const currentPassword = res.rows.item(0).password;
        if(passwordActual !== currentPassword){
          this.alerta.presentToast('Tu contraseña actual no es la que ingresaste.')
          return;
        }
        if(password === currentPassword){
          this.alerta.presentToast('No puedes cambiar tu contraseña por la que ya tienes!')
          return;
        }
        else{
           this.database.executeSql('UPDATE usuario SET password = ? WHERE id_usuario = ? and password = ?;',[password,idUsuario,passwordActual])
            .then((res)=>{
              if(res.rowsAffected>0){
                this.alerta.presentToast('Contraseña actualizada! Tendras que volver a iniciar sesion');
                this.router.navigate(['/login']);
                localStorage.clear();
                this.getUsuario(idUsuario);
              }
            })
            .catch((error)=>{
              this.presentAlert('Perfil','error en el cambio : '+JSON.stringify(error));
            })
        }
      }
    })
  }

   async updateUsuario(usuario : string, edad : number, imagen : Blob){
    let query = "UPDATE usuario SET";
    const params : any[] = [];

    if(usuario){
      query += ' nombre = ?';
      params.push(usuario);
    }

    if (edad){
      if(edad<13){
        this.alerta.presentToast('No puedes ser menor de 13 años.')
        return;
      }
  
      query += params.length ? ', edad = ?' : ' edad = ?';
      params.push(edad);
    }

    if (imagen){
      query += params.length ? ', imagen = ?' : ' imagen = ?';
      params.push(imagen);
    }

    if(params.length>0){

      const usuarioIdString = localStorage.getItem('usuarioId');
      const id = usuarioIdString ? parseInt(usuarioIdString,10) || 0 : 0;
      query +="WHERE id_usuario = ?";
      params.push(id);

      this.database.executeSql(query,params)
      .then((res)=>{
        this.alerta.presentToast('Datos editados con exito!')
        this.getUsuario(id);
        this.router.navigate(['/perfil']);
        
      })
      .catch(error=>{
        if (error.message.includes('UNIQUE constraint failed')) {
          this.presentAlert('Modificar usuario', 'El nombre de usuario ya está registrado.');
        }
        else{ 
        this.presentAlert('Editar perfil','Error al actualizar : '+ JSON.stringify(error));
        }
      })

    }else{
      this.alerta.presentToast('No has proporcionado nada!')
    }
  }


  insertarJuego(nombre : string,imagen : Blob, plataforma : number, categoria : number , precio : number,descripcion : string){
    return this.database.executeSql('INSERT INTO juego(nombre_juego, precio, id_plataforma, id_categoria, descripcion, imagen) VALUES (?, ?, ?, ?, ?, ?);',[nombre, precio, plataforma, categoria, descripcion, imagen]).then((res)=>{
      this.alerta.presentToast('juego registrado con exito!')
      this.getJuegos();
    }).catch((error=>{
      this.presentAlert('Juego registrado','Error : '+JSON.stringify(error));
    }))

  } 

  async deleteJuego(id : number){
    return this.database.executeSql('DELETE FROM juego where id_juego = ?',[id]).then((res)=>{
      this.alerta.presentToast('juego eliminado con exito!')
      this.getJuegos()
      
    }).catch((error)=>{
      this.presentAlert('juego eliminada','error : ' + JSON.stringify(error)) 
    })
  } 

     async updateJuego(nombre: string, imagen: Blob, plataforma: number, categoria: number, precio: number, descripcion: string, id: number) {
      let query = "UPDATE juego SET";
      const params: any[] = [];
    
      if (nombre) {
        query += ' nombre_juego = ?';
        params.push(nombre);
      }
    
      if (precio) {
        query += params.length ? ', precio = ?' : ' precio = ?';
        params.push(precio);
      }
    
      if (plataforma) {
        query += params.length ? ', id_plataforma = ?' : ' id_plataforma = ?';
        params.push(plataforma);
      }
    
      if (categoria) {
        query += params.length ? ', id_categoria = ?' : ' id_categoria = ?';
        params.push(categoria);
      }
    
      if (descripcion) {
        query += params.length ? ', descripcion = ?' : ' descripcion = ?';
        params.push(descripcion);
      }
    
      if (imagen) {
        query += params.length ? ', imagen = ?' : ' imagen = ?';
        params.push(imagen);
      }
    
      if (params.length > 0) {
        query += " WHERE id_juego = ?";
        params.push(id);
    
        this.database.executeSql(query, params)
          .then(() => {
            this.alerta.presentToast('Juego editado con éxito!');
            this.getJuegos();
          })
          .catch(error => {
            this.presentAlert('Editar juego', 'Error al actualizar: ' + JSON.stringify(error));
          });
      } else {
        this.alerta.presentToast('No has proporcionado nada para actualizar!');
      }
    } 



  getJuegos(){
    return this.database.executeSql('SELECT juego.*, plataforma.nombre as nombre_plataforma, categoria.nombre as nombre_categoria FROM juego JOIN plataforma on juego.id_plataforma = plataforma.id_plataforma JOIN categoria on juego.id_categoria = categoria.id_categoria;',[]).then(res=>{

      let items : Juego[] = [];

      if(res.rows.length>0){
        for(var i = 0; i < res.rows.length; i++){
          items.push({
            id_juego : res.rows.item(i).id_juego,
            nombre_juego : res.rows.item(i).nombre_juego,
            precio : res.rows.item(i).precio,
            nombre_plataforma : res.rows.item(i).nombre_plataforma,
            nombre_categoria : res.rows.item(i).nombre_categoria,
            descripcion : res.rows.item(i).descripcion,
            imagen : res.rows.item(i).imagen
          })
        }
      }
      this.listaJuegos.next(items as any);

    }).catch((error=>{
      this.presentAlert('get juegos','error en la bd :'+JSON.stringify(error))
    }))

  }

  getJuegosRandom(){
    return this.database.executeSql('SELECT juego.*, plataforma.nombre as nombre_plataforma, categoria.nombre as nombre_categoria FROM juego JOIN plataforma on juego.id_plataforma = plataforma.id_plataforma JOIN categoria on juego.id_categoria = categoria.id_categoria  ORDER BY RANDOM() LIMIT 3;',[]).then(res=>{

      let items : Juego[] = [];

      if(res.rows.length>0){
        for(var i = 0; i < res.rows.length; i++){
          items.push({
            id_juego : res.rows.item(i).id_juego,
            nombre_juego : res.rows.item(i).nombre_juego,
            precio : res.rows.item(i).precio,
            nombre_plataforma : res.rows.item(i).nombre_plataforma,
            nombre_categoria : res.rows.item(i).nombre_categoria,
            descripcion : res.rows.item(i).descripcion,
            imagen : res.rows.item(i).imagen
          })
        }
      }
      this.listaJuegosRandom.next(items as any);

    }).catch((error=>{
      this.presentAlert('get juegos','error en la bd :'+JSON.stringify(error))
    }))

  }

  getJuegosById(id : number){
    return this.database.executeSql('SELECT juego.*, plataforma.nombre as nombre_plataforma, categoria.nombre as nombre_categoria FROM juego JOIN plataforma on juego.id_plataforma = plataforma.id_plataforma JOIN categoria on juego.id_categoria = categoria.id_categoria WHERE id_juego = ?',[id])
    .then(res=>{

      if(res.rows.length > 0){

        const juego: Juego = new Juego(
          res.rows.item(0).id_juego,
          res.rows.item(0).nombre_juego,
          res.rows.item(0).precio,
          res.rows.item(0).nombre_plataforma,
          res.rows.item(0).nombre_categoria,
          res.rows.item(0).descripcion,
          res.rows.item(0).imagen,
          res.rows.item(0).id_plataforma,
          res.rows.item(0).id_categoria,

        )

        this.juegoBD.next(juego)
      }

    })
  }

  getJuegoByPlataforma(id : number){
    return this.database.executeSql('SELECT juego.*, plataforma.nombre as nombre_plataforma, categoria.nombre as nombre_categoria FROM juego JOIN plataforma on juego.id_plataforma = plataforma.id_plataforma JOIN categoria on juego.id_categoria = categoria.id_categoria WHERE juego.id_plataforma = ?',[id]).then((res)=>{

      let items : Juego[] = [];

      if(res.rows.length>0){
        for(var i = 0; i < res.rows.length; i++){
          items.push({
            id_juego : res.rows.item(i).id_juego,
            nombre_juego : res.rows.item(i).nombre_juego,
            precio : res.rows.item(i).precio,
            nombre_plataforma : res.rows.item(i).nombre_plataforma,
            nombre_categoria : res.rows.item(i).nombre_categoria,
            descripcion : res.rows.item(i).descripcion,
            imagen : res.rows.item(i).imagen
          })
        }
      }
      this.listaPlataforma.next(items as any);
    })
  }

  getJuegoByCategoria(id : number){
    return this.database.executeSql('SELECT juego.*, plataforma.nombre as nombre_plataforma, categoria.nombre as nombre_categoria FROM juego JOIN plataforma on juego.id_plataforma = plataforma.id_plataforma JOIN categoria on juego.id_categoria = categoria.id_categoria WHERE juego.id_categoria = ?',[id]).then((res)=>{

      let items : Juego[] = [];

      if(res.rows.length>0){
        for(var i = 0; i < res.rows.length; i++){
          items.push({
            id_juego : res.rows.item(i).id_juego,
            nombre_juego : res.rows.item(i).nombre_juego,
            precio : res.rows.item(i).precio,
            nombre_plataforma : res.rows.item(i).nombre_plataforma,
            nombre_categoria : res.rows.item(i).nombre_categoria,
            descripcion : res.rows.item(i).descripcion,
            imagen : res.rows.item(i).imagen
          })
        }
      }
      this.listaCategoria.next(items as any);
    }).catch((error=>{
      this.presentAlert('get juegos by categoria','error en la bd :'+JSON.stringify(error))
    }))
  }

    async insertJuegosInCarro(id_usuario: number, id_juego: number) {
      try {
        const resComprado = await this.database.executeSql(
          "SELECT * FROM detalle_compra dc JOIN compra c on dc.id_compra = c.id_compra WHERE c.id_usuario = ? AND dc.id_juego = ? AND c.id_estado = 2",
          [id_usuario, id_juego]
        );
    
        if (resComprado.rows.length > 0) {
          this.alerta.presentToast('Ya has comprado este juego!');
          return; 
        }

        const resCarro = await this.database.executeSql(
          "SELECT * FROM compra WHERE id_usuario = ? AND id_estado = (SELECT id_estado FROM estado_compra WHERE nombre_estado = 'Carro')",
          [id_usuario]
        );
    
        let id_compra: number;
    
        if (resCarro.rows.length > 0) {
          id_compra = resCarro.rows.item(0).id_compra; 
        } else {
          const resultado = await this.database.executeSql(
            "INSERT INTO compra (id_usuario, total, id_estado) VALUES (?, 0, (SELECT id_estado FROM estado_compra WHERE nombre_estado = 'Carro'))",
            [id_usuario]
          );
          id_compra = resultado.insertId;
        }
        const resDetalle = await this.database.executeSql(
          "SELECT * FROM detalle_compra WHERE id_compra = ? AND id_juego = ?",
          [id_compra, id_juego]
        );
    
        if (resDetalle.rows.length > 0) {
          this.alerta.presentToast('Este juego ya está en el carro!');
          return;
        }
        await this.database.executeSql(
          "INSERT INTO detalle_compra (id_compra, id_juego, subtotal) VALUES (?, ?, (SELECT precio FROM juego WHERE id_juego = ?))",
          [id_compra, id_juego, id_juego]
        );
    
        this.alerta.presentToast('Juego añadido al carro correctamente!');
        await this.updateTotal(id_compra); 
    
      } catch (error) {
        this.presentAlert('Carro', 'Error en la base de datos de insert: ' + JSON.stringify(error));
      }
    }

  updateTotal(id_compra: number) {
    this.database.executeSql("SELECT SUM(subtotal) as total FROM detalle_compra WHERE id_compra = ?;", [id_compra])
      .then((res) => {
        const total = res.rows.item(0).total || 0;
        this.database.executeSql("UPDATE compra SET total = ? WHERE id_compra = ?", [total, id_compra])
          .catch((error) => {
            this.presentAlert('error en la db de total (actualización)', ' : ' + JSON.stringify(error));
          });
      })
      .catch((error) => {
        this.presentAlert('error en la db de total (consulta)', ' : ' + JSON.stringify(error));
      });
  }


  getTotal(id_usuario : number){
    this.totalCarro.next(0);
    this.database.executeSql("SELECT id_compra FROM compra WHERE id_usuario = ? AND id_estado =  1",[id_usuario])
    .then((res)=>{
      if (res.rows.length > 0){
        const id_compra = res.rows.item(0).id_compra;

        return this.database.executeSql("SELECT total FROM compra WHERE id_compra = ?",[id_compra])
        .then((res)=>{
          const total = (res.rows.length > 0 && res.rows.item(0).total !== null) ? res.rows.item(0).total : 0;
          this.totalCarro.next(total)
          return;
        });
      }else{
        this.totalCarro.next(0);
        return;
      }
    }).catch((error)=>{
      this.presentAlert('error en la db de get total ',' : '+JSON.stringify(error))
    })
  }


  getJuegosCarro(id_usuario : number){
    return this.database.executeSql(
      `SELECT juego.*, plataforma.nombre AS nombre_plataforma, categoria.nombre AS nombre_categoria, detalle_compra.subtotal 
       FROM juego 
       JOIN plataforma ON juego.id_plataforma = plataforma.id_plataforma 
       JOIN categoria ON juego.id_categoria = categoria.id_categoria 
       JOIN detalle_compra ON detalle_compra.id_juego = juego.id_juego 
       JOIN compra ON detalle_compra.id_compra = compra.id_compra 
       WHERE compra.id_usuario = ? AND compra.id_estado = 1;`,
      [id_usuario]
    )
    .then((res)=>{

      let items : any[] = [];

      if(res.rows.length > 0){
        for(let i = 0; i < res.rows.length; i++){
          items.push({
            id_juego : res.rows.item(i).id_juego,
            nombre_juego: res.rows.item(i).nombre_juego,
            precio: res.rows.item(i).precio,
            nombre_plataforma: res.rows.item(i).nombre_plataforma,
            nombre_categoria: res.rows.item(i).nombre_categoria,
            subtotal: res.rows.item(i).subtotal,
            descripcion: res.rows.item(i).descripcion,
            imagen: res.rows.item(i).imagen
          });
        }
      }
      this.listaCarro.next(items);
    }).catch((error)=>{
      this.presentAlert('error en la db de carro',' : '+ JSON.stringify(error));
    })
  }

  eliminarJuegoCarro(id_usuario : number, id_juego : number){
    this.database.executeSql("SELECT id_compra FROM compra WHERE id_usuario = ? AND id_estado = 1;",[id_usuario])
    .then((res)=>{
      if(res.rows.length>0){
        const id_compra = res.rows.item(0).id_compra;

        this.database.executeSql("DELETE FROM detalle_compra WHERE id_juego = ? AND id_compra = ? ;", [id_juego,id_compra])
        .then(()=>{
          this.alerta.presentToast('se ha eliminado el juego del carro!')


          this.updateTotal(id_compra);
          this.getJuegosCarro(id_usuario);
        }).catch((error)=>{
          this.presentAlert('error en la db eliminar carro',' : '+JSON.stringify(error));
        });
      }else{
        this.presentAlert('carro vacio','no hay nada que eliminar');
      }
    }).catch((error)=>{
      this.presentAlert('error en la db eliminar carro con id compra ',' : '+JSON.stringify(error));
    })


  }

  comprarJuegos(id_usuario : number){

    this.database.executeSql("SELECT id_compra FROM compra WHERE id_usuario = ? AND id_estado = 1;",[id_usuario])
    .then((res)=>{
      if(res.rows.length > 0){
        const id_compra = res.rows.item(0).id_compra;

        this.database.executeSql("DELETE FROM lista_deseados WHERE id_juego IN(SELECT id_juego FROM detalle_compra WHERE id_compra = ?) AND id_usuario = ?",[id_compra, id_usuario])
        .then(()=>{
          this.database.executeSql("UPDATE compra SET id_estado = 2 WHERE id_compra = ? ",[id_compra])
          .then((res)=>{
            this.alerta.presentAlert('Compra realizada','Has comprado tus juegos con exito!')
            
            this.getDeseados(id_usuario)
            this.listaCarro.next([])

          })

        })
      }else{
        this.presentAlert('Carro vacio','No hay nada que comprar');
      }
    }).catch((error)=>{
      this.presentAlert('error en la db compra ',' : '+JSON.stringify(error));
    })

  }

  async getJuegosComprados(id_usuario: number) {
    try {
      const res = await this.database.executeSql(
        `SELECT juego.*, plataforma.nombre AS nombre_plataforma, categoria.nombre AS nombre_categoria, detalle_compra.subtotal
         FROM juego
         JOIN plataforma ON juego.id_plataforma = plataforma.id_plataforma
         JOIN categoria ON juego.id_categoria = categoria.id_categoria
         JOIN detalle_compra ON detalle_compra.id_juego = juego.id_juego
         JOIN compra ON detalle_compra.id_compra = compra.id_compra
         WHERE compra.id_usuario = ? AND compra.id_estado = 2;`,
        [id_usuario]
      );
  
      let items = Array.from({ length: res.rows.length }, (_, i) => ({
        id_juego: res.rows.item(i).id_juego,
        nombre_juego: res.rows.item(i).nombre_juego,
        precio: res.rows.item(i).precio,
        nombre_plataforma: res.rows.item(i).nombre_plataforma,
        nombre_categoria: res.rows.item(i).nombre_categoria,
        subtotal: res.rows.item(i).subtotal,
        descripcion: res.rows.item(i).descripcion,
        imagen: res.rows.item(i).imagen
      }));
  
      this.listaCompras.next(items);
      return items; // Opcional: retornar los items
    } catch (error) {
      console.error('Error en la base de datos al obtener compras:', error);
      this.presentAlert('Error en la DB', 'Error al obtener compras: ' + JSON.stringify(error));
      return;
    }
  }


  InsertDeseado(id_juego : number, id_usuario : number){
    this.database.executeSql("SELECT * FROM detalle_compra dc JOIN compra c on dc.id_compra = c.id_compra WHERE c.id_usuario = ? AND dc.id_juego = ? AND c.id_estado = 2",[id_usuario,id_juego])
    .then((res)=>{
      if(res.rows.length>0){
        this.alerta.presentToast('Ya has comprado este juego!')
        return;
      }else{
        return this.database.executeSql("SELECT * FROM lista_deseados WHERE id_usuario = ? AND id_juego = ?",[id_usuario,id_juego])
        .then((res)=>{
          if(res.rows.length === 0){

            this.database.executeSql("INSERT INTO lista_deseados (id_usuario,id_juego) VALUES(?,?) ",[id_usuario,id_juego])
            .then((res)=>{
              this.alerta.presentToast('Juego añadido a tu lista de deseados!')


            }).catch((error)=>{
              this.presentAlert('error al agregar deseado db', ': '+JSON.stringify(error));
            })

          }else{
            this.alerta.presentToast('Ya tienes este juego en tu lista de deseados!')

          }
        }).catch((error)=>{
          this.presentAlert('error db select deseados',' : '+JSON.stringify(error));
        })
          }
        })

  }

  async deleteDeseado(id_usuario : number, id_juego : number){
    return this.database.executeSql("DELETE FROM lista_deseados WHERE id_juego = ? AND id_usuario = ?",[id_juego,id_usuario])
    .then((res)=>{
      this.alerta.presentToast('Se ha eliminado el juego de tu lista de deseados!')

      this.getDeseados(id_usuario);
    }).catch((error)=>{
      this.presentAlert('error en la db eliminar deseado',' : '+JSON.stringify(error));
    })
  }


  getDeseados(id_usuario : number){
    this.database.executeSql(``)
    return this.database.executeSql(`SELECT  juego.* ,  plataforma.nombre AS nombre_plataforma, categoria.nombre AS nombre_categoria
      FROM juego
      JOIN plataforma ON juego.id_plataforma = plataforma.id_plataforma
      JOIN categoria ON juego.id_categoria = categoria.id_categoria
      JOIN lista_deseados ON lista_deseados.id_juego = juego.id_juego
      WHERE lista_deseados.id_usuario = ?
      `,[id_usuario])
    .then((res=>{
      let items : any[] = [];

      if(res.rows.length > 0){
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id_juego: res.rows.item(i).id_juego,
            nombre_juego: res.rows.item(i).nombre_juego,
            precio: res.rows.item(i).precio,
            nombre_plataforma: res.rows.item(i).nombre_plataforma,
            nombre_categoria: res.rows.item(i).nombre_categoria,
            descripcion: res.rows.item(i).descripcion,
            imagen: res.rows.item(i).imagen
          });
        }
      }
      this.listaDeseados.next(items);

    })).catch((error)=>{
      this.presentAlert("error en la db get deseados",' : '+JSON.stringify(error));
    })
  }
  }

