import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '@services/client.service';
import { ObvsService } from '@services/obvs.service';
import { toast } from '@utils/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contactenos',
  templateUrl: './contactenos.component.html',
  styleUrls: ['./contactenos.component.scss'],
})
export class ContactenosComponent implements OnInit {
  formularioGroup: FormGroup;

  constructor(
    private _clienteService: ClienteService,
    private _messageService: MessageService,
    private _obvsService: ObvsService
  ) {}

  ngOnInit() {
    this.formularioGroup = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      emailAddress: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      telefono: new FormControl(null, [Validators.required]),
      empresa: new FormControl(null, [Validators.required]),
      mensaje: new FormControl(null, [Validators.required]),
    });
  }

  async enviarSolicitud() {
    try {
      this._obvsService.toogleSpinner()
      await this._clienteService
        .sendEmailSolicitud(this.formularioGroup.value)
        .toPromise();
      this.formularioGroup.reset();
      toast({
        title: 'Correo enviado',
        message: 'El correo ha sido enviado con exito',
        type: 'success',
        messageService: this._messageService,
      });
    } catch (error) {
      console.log(error);
    } finally{
      this._obvsService.toogleSpinner()
    }
  }
}
