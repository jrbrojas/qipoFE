import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario  : any;
  flatSession : boolean = false;

  constructor(private fb: FormBuilder, private router: Router,
              private authService : AuthService) {
  }
  
  ngOnInit(): void {
    this.initForm()
  }

  private initForm(){
    this.formulario = this.fb.group({
      usuario : ['', Validators.required],
      clave   : ['', Validators.required]
    });
  }

  get usuarioNoValido(){
    return this.validarCampos('usuario');
  }

  get claveNoValido(){
    return this.validarCampos('clave');
  }

  private validarCampos(nombreCampo: string){
    return this.formulario.get(nombreCampo).invalid && this.formulario.get(nombreCampo).touched;
  }

  public save(){
    if (this.formulario.invalid) {
      this.flatSession = true;
    }
    if (this.formulario.valid) {
      this.flatSession = false;
      const usuario = this.formulario.value;
      const login: Login = {
        usuario : usuario.usuario,
        clave   : usuario.clave
      }
      this.authService.login(login).subscribe((data)=>{
        if (data){
          this.router.navigateByUrl('/panel');
        }
        else{
          this.flatSession = true;
        }
      });

    }
  }

}
