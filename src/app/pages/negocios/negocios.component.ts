import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'src/app/interfaces/table.interfaces';
import { NegociosService } from 'src/app/services/negocios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-negocios',
  templateUrl: './negocios.component.html',
  styleUrls: ['./negocios.component.css']
})
export class NegociosComponent implements OnInit {

  public toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  public cargando: boolean = true;
  public porPagina: number = 100;
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

  constructor(private negocioService: NegociosService,
              private router: Router) { }

  ngOnInit(): void {
    this.getNegocios(this.tableData.pagActual);
  }

  getNegocios(pagina: number) {
    this.cargando = true;
    this.negocioService.getNegocios( pagina, this.porPagina, this.filtro )
          .subscribe( negocios => {
            this.tableData = negocios;
            this.cargando = false;
          });

  }
  
  findSuscriptionsDays(finSuscripcion: string) {

    if( finSuscripcion === undefined ) {
      return -1;
    }

    const dateEnd = new Date(finSuscripcion);
    const today = new Date();
    const difference: any = dateEnd.getTime() - today.getTime();
    return Math.round( difference / (1000*60*60*24));

  }

  findLastLoginDays(lastLogin: string) {

    if( lastLogin === undefined ) {
      return -1;
    }

    const dateEnd = new Date(lastLogin);
    const today = new Date();
    const difference: any = today.getTime() - dateEnd.getTime();
    return Math.round( difference / (1000*60*60*24));

  }

  buscar(query: string) {
    this.filtro = query;
    this.getNegocios(this.tableData.pagActual);
  }

  mostrar(event: any): void {
    this.porPagina = Number(event.value);
    this.getNegocios(this.tableData.pagActual);
  }

  goToNegocio(idNegocio: string) {
    this.router.navigateByUrl(`dashboard/detalle-negocio/${idNegocio}`);
  }

}
