

let okrenutaKarta = false;
let dve_karte = false;
let prvaKarta;
let drugaKarta;
let brojac=0;
let brojac_pogodaka = 0;

// TODO Uzima vrednost iz inputa i treba da odredi broj karata u funkciji dodaj()
let broj_karata = document.getElementById("br_karata").value;

// TODO Dodaje odredjeni broj karata na tablu. iako se klasa dodala kreirani elementima funkcije ne rade
// TODO Ubaciti funkciju za shuffle. 
function dodaj (){
    for(let i=0;i<14; i++){
    let novi_div = document.createElement('div');
    novi_div.classList.add('kartica');
    novi_div.dataset.karta = "deseta";
    novi_div.innerHTML = `<div class="prednja"><img src="materijal/slike/10.jpg" alt="deseta"></div>
    <div class="zadnja"><img src="materijal/slike/zadnja.jpg" alt="zadnja"></div>`;
    let tabla = document.getElementById("tabla");
    tabla.appendChild(novi_div);
    };
};

// Klikom na dugme se poziva funkcija dodaj i startuje merac vremena
let nova_igra = document.getElementById("nova_igra");

// Klikom na dugme 'Nova igra' stranica se reloaduje
nova_igra.addEventListener('click', reloaduj);

// TODO Klikom na dugme 'Nova igra' pokrenuti merac vremena. Ovo ne radi
// nova_igra.addEventListener('click', dodaj);
// nova_igra.addEventListener('click', merac);
if(nova_igra){
    merac();
}

function reloaduj(){
    document.location.reload();
};

// Sve kartice sa klasom .kartica. Klikom na njih pocinje igra i poziva funkcija okreniKartu()
let kartica = document.querySelectorAll (".kartica");
kartica.forEach(karta => karta.addEventListener('click', okreniKartu));

//Okrece karte i proverava da li se podudaraju po atributu dataset
function okreniKartu (){
    
    if(dve_karte == true){
        return;
    }
    if(this === prvaKarta){
        return;
    }

    this.classList.add('okreni');

    if(!okrenutaKarta){
        okrenutaKarta = true;
        prvaKarta = this;
    }else{
        drugaKarta = this;
    }
    if(prvaKarta.dataset.karta === drugaKarta.dataset.karta){
        pogodak();
        brojac_pogodaka++;
    }else{
        promasaj();
    }
    // Broji poteze i ispisuje ih.
    brojac++;
    document.getElementById("brojac").innerHTML = brojac;

    //Kada se spoje svi parovi ispisuje alert Cestitamo sa procentom uspesnosti. Nakon klika na alert stranica se reloaduje
    if(brojac_pogodaka == 9){
    alert("Čestitamo, spojili ste sve parove, vaša uspešnost je " + ((brojac_pogodaka/brojac)*100).toFixed(1) + " %");
    reloaduj();
    };
};

    
//Ova funkcija omogucava da pogodjene karte ostanu okrenute na prednjoj strani
function pogodak(){  
        prvaKarta.removeEventListener('click', okreniKartu);
        drugaKarta.removeEventListener('click', okreniKartu);

        resetuj();   
}

function promasaj(){

    dve_karte = true;

    setTimeout(()=>{
        prvaKarta.classList.remove('okreni');
        drugaKarta.classList.remove('okreni');
        resetuj()
        },1000);
 
};

function resetuj(){
    okrenutaKarta = false;
    dve_karte = false;
    prvaKarta = null;
    drugaKarta = null;
};

// Meri vreme proteklo od klika na Nova igra (od ucitavanja stranice). Nakon 2 minuta ispisuje se alert poruka "Vreme je isteklo" i na confirm se reloaduje.
function merac(){
    let m=0;
    let s=0;
   
    let tajmer = setInterval( function () {
    document.getElementById("tajmer").innerHTML = m +":"+ s;
    s++;
    if(s>59){
        m++;
        s=0;       
    }else if(s==59 && m>0){
        clearInterval(tajmer);
        document.getElementById("tajmer").innerHTML = "Vreme je isteklo";
        alert("Vreme je isteklo, spojili ste " + brojac_pogodaka + " karata.");
        reloaduj();
    };

    },1000);
    
};
// IIFE funkcija. Pokrece se odmah po ucitavanju stranice i nasumicno dodaje elementima flex svojstvo order
(function izmesaj(){
    kartica.forEach(karta => {
    let pozicija = Math.floor(Math.random()*12);
    karta.style.order = pozicija;});
})();



