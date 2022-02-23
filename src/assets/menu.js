export default [
      {
        "expanded":false,
        "title":"Inicio",
        "to":"inicio",
        "icon":"fa-home"
      },
      {
        "expanded":"",
        "title":"Alquiler",
        "icon":"fa-funnel-dollar",
        "menu":[
        
          {"to":"clientes","name":"clientes",icon:"fa-users"},
          {"to":"reporte-mensual","name":"Reportes",icon:"fa-funnel-dollar"},
        ]
      },
      {
        "expanded":"",
        "title":"Red",
        "icon":"fa-wifi",
        "menu":[
        
          {"to":"invitados","name":"Invitados",icon:"fa-funnel-dollar"},
          {"to":"privados","name":"Interna",icon:"fa-key"},
          {"to":"bloqueados","name":"Bloqueados",icon:"fa-lock"}
        ]
      }/*,

      {
        "expanded":"",
        "title":"Clientes",
        "icon":"fa-star", 
        "menu":[
          {"to":"clientes","name":"Lista"},
          {"to":"insertar-cliente","name":"Agregar"}
        ]
      }*/
];