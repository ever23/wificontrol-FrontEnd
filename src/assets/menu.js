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
          {"to":"equipos","name":"Resumen",icon:"fa-list-alt"},
        ]
      },
      {
        "expanded":"",
        "title":"Red",
        "icon":"fa-wifi",
        "menu":[
        
          {"to":"invitados","name":"Invitados",icon:"fa-funnel-dollar"},
          {"to":"privados","name":"Interna",icon:"fa-key"},
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