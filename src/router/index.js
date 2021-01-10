import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'LandingPage',
        component: () => import('../views/LandingPage.vue')
    },
    {
        path: '*',
        name: 'NoEncontrada',
        component: () => import('../views/NoEncontrada.vue')
    },
    {
        path: '/test',
        name: 'Test',
        component: () => import('../views/Test.vue')
    },
    {
        path: '/iniciar-sesion',
        name: 'IniciarSesion',
        component: () => import('../views/IniciarSesion.vue')
    },
    {
        path: '/registrar-cliente',
        name: 'RegistrarCliente',
        component: () => import('../views/RegistrarCliente.vue')
    },
    {
        path: '/registrar-hotelero',
        name: 'RegistrarHotelero',
        component: () => import('../views/RegistrarHotelero.vue')
    },
    {
        path: '/registrar-hotel',
        name: 'RegistrarHotel',
        component: () => import('../views/RegistrarHotel.vue')
    },
    {
        path: '/inicio-cliente',
        name: 'InicioCliente',
        component: () => import('../views/InicioCliente.vue')
    }
]

const titulos = {
    "LandingPage" : "Bienvenido a HOTEL",
    "NoEncontrada" : "Lo sentimos - 404",
    "IniciarSesion" : "Inicio de sesión",
    "RegistrarCliente" : "Regístrate",
    "RegistrarHotelero" : "Regístrate",
    "RegistrarHotel" : "Registra tu hotel",
    "InicioCliente" : "Inicio",
}

const excluirRuta = ["LandingPage", "IniciarSesion", "RegistrarCliente", "RegistrarHotelero", "RegistrarHotel", "NoEncontrada"]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.afterEach((toRoute, fromRoute) => {
    window.document.title = titulos[toRoute.name];
    if (!excluirRuta.includes(toRoute.name)) {
        if (!localStorage.getItem("usuarioEnLinea")) {
            location.href = "/";
        }
    }
});

export default router