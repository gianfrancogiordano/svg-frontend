import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Table } from 'src/app/interfaces/table.interfaces';
import Swal from 'sweetalert2';
import { InventarioTelasService } from 'src/app/services/inventario-telas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-inventario-telas',
  templateUrl: './inventario-telas.component.html',
  styleUrls: ['./inventario-telas.component.css']
})
export class InventarioTelasComponent implements OnInit {

  public toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
  });

  public formTela = this.fb.group({
    sku: [''],
    descripcion: ['', [Validators.required]],
    color: ['', [Validators.required]],
    ancho: [0, [Validators.required, Validators.min(1)]],
    promedio: [0, [Validators.required, Validators.min(1)]],
    kg: [0, [Validators.required, Validators.min(1)]],
    cantidadIngresada: [0, [Validators.required, Validators.min(1)]],
    cantidad: [0, [Validators.required, Validators.min(1)]],
    unidadMedida: ['', [Validators.required]],
    proveedor: ['', [Validators.required]],
    skuproveedor: ['', [Validators.required]],
    usuario: ['']
  });

  // Tabla Telas
  public cargando: boolean = true;
  public porPagina: number = 1000;
  public filtro: string = '';
  public tableData: Table = {
    conteo: 0,
    data: [],
    pagActual: 1,
    ultimaPag: 1,
    pagSiguiente: 0,
    pagAnterior: 0,
    pagTotal: 0,
    paginas: []
  };

  constructor(private inventarioTelas: InventarioTelasService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder) { }

  ngOnInit(): void { this.getTelas(this.tableData.pagActual); }

  createCantidad() {
    const promedio: number = this.formTela.get('promedio')?.value || 0;
    const kg: number = this.formTela.get('kg')?.value || 0;
    this.formTela.get('cantidad')?.setValue((promedio * kg));
    this.formTela.get('cantidadIngresada')?.setValue((promedio * kg));
  }

  cleanForm() {
    this.formTela = this.fb.group({
      sku: [''],
      descripcion: ['', [Validators.required]],
      color: ['', [Validators.required]],
      ancho: [0, [Validators.required, Validators.min(1)]],
      promedio: [0, [Validators.required, Validators.min(1)]],
      kg: [0, [Validators.required, Validators.min(1)]],
      cantidadIngresada: [0, [Validators.required, Validators.min(1)]],
      cantidad: [0, [Validators.required, Validators.min(1)]],
      unidadMedida: ['', [Validators.required]],
      proveedor: ['', [Validators.required]],
      skuproveedor: ['', [Validators.required]],
      usuario: ['']
    });
  }

  getTelas(pagina: number) {
    this.inventarioTelas.getTelas( pagina, this.porPagina, this.filtro )
        .subscribe({
          next: (telas) => {
              this.cargando = false;
              this.tableData = telas;
          },
          error: (e) => {console.log(e);}
        });
  }

  createTela() {

    if ( this.formTela.invalid ) {
      Swal.fire('Uppss ...', `Faltan datos para ingresar la tela al inventario`, 'info');
      return;
    }

    this.formTela.get('usuario')?.setValue(this.usuarioService.usuario.uid || '');
    this.inventarioTelas.insertTela(this.formTela.value)
          .subscribe({
            next: (p) => {
              console.log(p);
              this.toast.fire({
                icon: 'success',
                title: 'Exitoso',
                text: 'La tela fue ingresada exitosamente al inventario'
              });

              this.cleanForm();
              this.getTelas(this.tableData.pagActual);

            },
            error: (e) => {

              console.log(e);
              Swal.fire({
                title: 'Upps ...',
                text: `${e.error.body}`,
                icon: 'error',
                confirmButtonText: 'Entiendo ...',
                confirmButtonColor: '#398bf7',
              });

            }
          });

  }

}
