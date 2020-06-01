import "./styles/index.scss";
import multiCountries from "./lib/multibar_map";
import createdropdown from "./lib/options-dropdwn";
import GetCountries from "./lib/countries_tally";



window.addEventListener("DOMContentLoaded", () => {
  GetCountries();
  multiCountries();
  createdropdown();
});
