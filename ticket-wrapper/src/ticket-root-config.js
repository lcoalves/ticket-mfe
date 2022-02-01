import { registerApplication, start } from "single-spa";

fetch('https://run.mocky.io/v3/52b7c456-1b11-4844-a28f-b9fd8c6d7837')
  .then(resp => resp.json())
  .then(data => {
    data.applications.forEach(app => {
      registerApplication({
        name: app.name,
        app: () => System.import(app.package),
        activeWhen: app.exact
          ? (location) => location.pathname === app.activeWhen
          : [app.activeWhen]
      });
    })
  })
  .finally(() => {
    start({
      urlRerouteOnly: true,
    })
  })
