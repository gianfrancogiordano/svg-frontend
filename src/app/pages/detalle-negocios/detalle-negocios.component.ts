import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'src/app/interfaces/table.interfaces';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { MarketService } from 'src/app/services/market.service';
import { NegociosService } from 'src/app/services/negocios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-negocios',
  templateUrl: './detalle-negocios.component.html',
  styleUrls: ['./detalle-negocios.component.css']
})
export class DetalleNegociosComponent implements OnInit {

  public currentMonthFirst: string = '';
  public currentMonthLast: string = '';

  // Opciones de graficos pixel clickstore
  public resultsChart: any[] = [];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = false;
  public showXAxisLabel = false;
  public xAxisLabel = '';
  public showYAxisLabel = false;
  public yAxisLabel = '';
  public colorScheme: any = { domain: ['#06d79c'] };

  // Totales de clickstore analytics
  public pageViewTotal: number = 0;
  public productViewTotal: number = 0;
  public addToCartTotal: number = 0;
  public purchaseTotal: number = 0;

  // Metricas
  public conversionRate: number = 0;
  public averageOrderValue: number = 0;
  public totalSales: number = 0;

  // Tabla productos mas visitados
  public productosVisitados: Table = {
    conteo: 0,
    data: [],
    pagActual: 1,
    ultimaPag: 1,
    pagSiguiente: 0,
    pagAnterior: 0,
    pagTotal: 0,
    paginas: []
  };

  // Tabla productos más comprados
  public productosComprados: Table = {
    conteo: 0,
    data: [],
    pagActual: 1,
    ultimaPag: 1,
    pagSiguiente: 0,
    pagAnterior: 0,
    pagTotal: 0,
    paginas: []
  };

  public toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
  });

  // public base_url: string = 'https://getcs.link';

  public negocioId: string = '';
  public negocio: any = {};
  public suscripciones: any[] = [];
  public usuarios: any[] = [];
  public categoriasCount: number = 0;
  public productosCount: number = 0;
  public lastCategoria: any = {};
  public lastProducto: any = {};
  public cargando: boolean = false;

  constructor(private negocioService: NegociosService,
    private route: ActivatedRoute,
    private marketService: MarketService,
    private router: Router,
    private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.negocioId = params['id'];
      this.getNegocio();

      this.getCurrentMonthFirst();
      this.getCurrentMonthLast();
      this.getAnalytics();
    });
  }

  getNegocio() {

    this.cargando = true;
    this.negocioService.getNegocio(this.negocioId)
      .subscribe(data => {
        this.negocio = data.negocio;
        this.suscripciones = data.suscripciones;
        this.usuarios = data.usuarios;

        this.getDataNegocio();
        this.cargando = false;
      });
  }

  getDataNegocio() {
    this.negocioService.getDataNegocio(this.negocioId)
      .subscribe(dataNegocio => {

        this.categoriasCount = dataNegocio.categoriasCount;
        this.productosCount = dataNegocio.productosCount;
        this.lastProducto = dataNegocio.lastProducto;
        this.lastCategoria = dataNegocio.lastCategoria;

      });
  }

  deleteMarket() {

    Swal.fire({
      title: 'Estas seguro?',
      text: `No sera posible revertir esta acción. Vamos a elminar ${this.negocio.nombre_comercial}`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Si, Eliminar a ${this.negocio.nombre_comercial}`
    }).then((result) => {

      if (result.isConfirmed) {
        this.marketService.deleteMarket(this.negocioId)
          .subscribe(resp => {

            this.toast.fire({
              icon: 'success',
              text: 'Se eliminaron: Productos, Categorias, Pedidos, Roles y Usuarios'
            });

          });
      }

    });
  }

  goToBioLink() {
    window.location.href = `https://getcs.link/${this.negocio.identnegocio}`;
  }

  goToMarket(whatsapp: string) {
    window.location.href = `https://getcs.link/${this.negocio.identnegocio}/${whatsapp}`;
  }

  goBack() {
    this.router.navigateByUrl(`/dashboard/negocios`);
  }

  shareLink(wsnumber: string, tipoLink: string) {

    const { url, title, text } = this.createLink(wsnumber, tipoLink);

    try {
      navigator.share({
        title,
        text,
        url
      });

    } catch (error) {
      this.copyLink(wsnumber, tipoLink);
    }

  }

  async copyLink(wsnumber: string, tipoLink: string) {

    const { url } = this.createLink(wsnumber, tipoLink);
    await navigator.clipboard.writeText(url);
    this.toast.fire({
      icon: 'info',
      text: 'Link copiado'
    });

  }

  createLink(wsnumber: string, tipoLink: string) {

    const identnegocio = this.negocio.identnegocio;

    //Links del catalogo detal
    let url = `${identnegocio}.getcs.link/${wsnumber}`;
    let title = `${this.negocio.nombre_comercial}`;
    let text = 'Entra en mi tienda! Te va a encantar';

    //Link del catalogo mayorista
    if (tipoLink === 'mayorista') {
      url = `${identnegocio}.getcs.link/${wsnumber}${tipoLink === 'mayorista' ? '/mayorista' : ''}`;
      text = 'Entra en mi tienda Mayorista! Te va a encantar';
    }

    // Links welcomepage
    if (tipoLink === 'welcomepage') {
      url = `${identnegocio}.getcs.link`;
      text = 'Entra en mi Biolink! Te va a encantar';
    }

    // Links welcomepage
    if (tipoLink === 'landing') {
      url = `${identnegocio}.getcs.link/landing`;
      text = 'Entra en mi web informativa! Te va a encantar';
    }

    return { url, title, text }

  }

  getAnalytics() {
    this.analyticsService.getAnalytics(this.negocioId, this.currentMonthFirst, this.currentMonthLast)
      .subscribe(resp => {

        this.productosVisitados = resp.masVistos;
        this.productosComprados = resp.masComprados;

        const pageView: any = [];
        const productView: any = [];
        const addToCart: any = [];
        const purchase: any = [];

        const dataResult: any = [];
        resp.clickAnalytics.forEach(v => {

          pageView.push({
            "name": this.chartsDates(new Date(v.createdAt), 'DAYS'),
            "value": Number(v.pageview)
          });

          productView.push({
            "name": this.chartsDates(new Date(v.createdAt), 'DAYS'),
            "value": Number(v.vercontenido)
          });

          addToCart.push({
            "name": this.chartsDates(new Date(v.createdAt), 'DAYS'),
            "value": Number(v.agregaralcarrito)
          });

          purchase.push({
            "name": this.chartsDates(new Date(v.createdAt), 'DAYS'),
            "value": Number(v.comprar)
          });

          // Totales
          this.pageViewTotal += Number(v.pageview);
          this.productViewTotal += Number(v.vercontenido);
          this.addToCartTotal += Number(v.agregaralcarrito);
          this.purchaseTotal += Number(v.comprar);

        });

        dataResult.push({ name: 'Visitas a la Tienda', series: pageView });
        dataResult.push({ name: 'Vista de Producto', series: productView });
        dataResult.push({ name: 'Agregar al Carrito', series: addToCart });
        dataResult.push({ name: 'Comprar', series: purchase });

        this.totalSales = resp.totalSales;
        this.averageOrderValue = this.totalSales / this.purchaseTotal;
        this.conversionRate = (this.purchaseTotal / this.pageViewTotal) * 100;

        this.resultsChart = dataResult;

      });
  }

  chartsDates(newDate: Date, verGrafico: string) {

    switch (verGrafico) {

      case 'DAYS':
        let anno: any = newDate.getFullYear();
        let mes: any = newDate.getMonth() + 1;
        let dia: any = newDate.getDate();
        mes = (mes < 10) ? ('0' + mes) : mes;
        dia = (dia < 10) ? ('0' + dia) : dia;
        return dia + '/' + mes;

      case 'MONTHS':
        return newDate.toLocaleString('default', { month: 'long' });

      case 'YEARS':
        return newDate.getFullYear();

      default:
        return null;

    }

  }

  getDateFromDayOfYear(day: number): Date {

    const year = new Date().getFullYear();
    const date = new Date(year, 0);
    const newDate = new Date(date.setDate(day));
    return newDate;

  }

  getCurrentMonthFirst() {
    let date = new Date()
    date.setDate(1)


    let anno: any = date.getFullYear();
    let mes: any = date.getMonth() + 1;
    let dia: any = date.getDate();

    mes = (mes < 10) ? ('0' + mes) : mes;
    dia = (dia < 10) ? ('0' + dia) : dia;

    this.currentMonthFirst = anno + '-' + mes + '-' + dia;
  }

  getCurrentMonthLast() {
    let date = new Date();
    let currentMonth = date.getMonth();
    let nextMonth = ++currentMonth;
    let nextMonthFirstDay: any = new Date(date.getFullYear(), nextMonth, 1);
    let oneDay = 1000 * 60 * 60 * 24;
    const lastDate = new Date(nextMonthFirstDay - oneDay);

    let anno: any = lastDate.getFullYear();
    let mes: any = lastDate.getMonth() + 1;
    let dia: any = lastDate.getDate();

    mes = (mes < 10) ? ('0' + mes) : mes;
    dia = (dia < 10) ? ('0' + dia) : dia;

    this.currentMonthLast = anno + '-' + mes + '-' + dia;

  }

  async copyWelcomeMessage() {

    const mensaje =
      `Te damos la bienvenida a Clickstore ${this.negocio.nombre_comercial} 🚀

    ▶️ ¿Cómo acceder a mi Administrador de Tienda Clickstore?
    Ingresa a este link: https://app.getcs.link
    
    Usuario: ${this.usuarios[0].user}
    contraseña: 123456
    
    
    ⚠ Sugerencia: Si manejas tus anuncios publicitarios por medio de Facebook ADS recuerda que nuestra plataforma te ofrece poder conectar el PIXEL y asi segmentar y crecer mejor tus ventas. 
    
    🥳 ¡FELICITACIONES! Acabas de elegir la mejor ruta para crecer tu negocio y conectar aún más con tus clientes. Juntos llevaremos tu negocio al siguiente nivel.
    Equipo clickstore Colombia.`;

    await navigator.clipboard.writeText(mensaje);

    this.toast.fire({
      icon: 'info',
      text: 'Mensaje inicial copiado'
    });

  }

  generarSuscripcion(plan: string) {

    let suscripcion = { monto: 0, day: 0 }

    switch (plan) {

      case 'PLAN 1 MES': 
        suscripcion = { monto: 79900, day: 31 }
        break;

      case 'PLAN 3 MESES':
        suscripcion = { monto: 197000, day: 91 }
        break;

      case 'PLAN 6 MESES':
        suscripcion = { monto: 397000, day: 181 }
        break;

      case 'PLAN 12 MESES':
        suscripcion = { monto: 497000, day: 366 }
        break;

      case 'PLAN 24 MESES':
        suscripcion = { monto: 697000, day: 731 }
        break;
    }

    return suscripcion;

  }

  renewSuscription(metodoPago: string, plan: string, monto: number, day: number) {

    const suscription: any = this.generarSuscripcion(plan);

    const newSuscription = {
      ... suscription,
      metodo_pago: metodoPago,
      plan,
      negocio: this.negocio._id
    }

    console.log(newSuscription);

    // this.negocioService.renewSuscription(newSuscription)
    //   .subscribe({
    //     next: () => {
    //       this.getNegocio();

    //       this.toast.fire({
    //         icon: 'info',
    //         text: 'Suscripcion Renovada'
    //       });

    //     }
    //   })

  }


}
