let dugme_prihvati = document.getElementById("prihvati");

dugme_prihvati.addEventListener('click', function() {

    let okrenuta_karta = false;
    let dve_karte = false;
    let prva_karta;
    let druga_karta;
    let brojac = 0;
    let brojac_pogodaka = 0;

    // Uzima vrednost iz inputa i treba da odredi broj karata u funkciji dodaj()
    let broj_karata = document.getElementById("br_karata").value;
    //Proverava da li su ispunjeni uslovi u pogledu parnosti i maksimalnog broja karata
    if (broj_karata % 2 == 1 || broj_karata < 2 || broj_karata > 24) {
        window.alert("Unesite paran broj karata izmedju 2 i 24");
        return false;
    }

    for (let i = 1; i <= broj_karata / 2; i++) {

        for (let y = 0; y < 2; y++) {
            let novi_div = document.createElement('div');
            novi_div.classList.add('kartica');
            novi_div.dataset.karta = i;
            novi_div.innerHTML = `<div class="prednja"><img src="materijal/slike/${i}.jpg"></div>
            <div class="zadnja"><img src="materijal/slike/zadnja.jpg" alt="zadnja"></div>`;
            let tabla = document.getElementById("tabla");
            tabla.appendChild(novi_div);
        }
    };

    let m = 0;
    let s = 0;

    function merac() {
        document.getElementById("tajmer").innerHTML = m + ":" + s;
        s++;
        if (s > 59) {
            m++;
            s = 0;
        } else if (s == 59 && m > 0) {
            clearInterval(tajmer);
            document.getElementById("tajmer").innerHTML = "Vreme je isteklo";
            alert("Vreme je isteklo, spojili ste " + brojac_pogodaka + " para.");
            reloaduj();
        };
    };

    let tajmer = setInterval(merac, 1000);

    let kartica = document.querySelectorAll(".kartica");
    kartica.forEach(karta => karta.addEventListener('click', okreniKartu));

    //Okrece karte i proverava da li se podudaraju po atributu dataset
    function okreniKartu() {

        if (dve_karte == true) {
            return;
        }
        if (this === prva_karta) {
            return;
        }

        this.classList.add('okreni');

        if (!okrenuta_karta) {
            okrenuta_karta = true;
            prva_karta = this;
        } else {
            druga_karta = this;
            okrenuta_karta = false;
            if (prva_karta.dataset.karta === druga_karta.dataset.karta) {
                pogodak();
                brojac_pogodaka++;
            } else {
                promasaj();
            }
            // Broji poteze i ispisuje ih.
            brojac++;
            document.getElementById("brojac").innerHTML = brojac;
        }

        //Kada se spoje svi parovi ispisuje alert Cestitamo sa procentom uspesnosti. Nakon klika na alert stranica se reloaduje

        if (brojac_pogodaka == broj_karata / 2) {
            alert("Čestitamo, spojili ste sve parove, vaša uspešnost je " + ((brojac_pogodaka / brojac) * 100).toFixed(1) + " %");
            reloaduj();
        };
    };
    //Ova funkcija omogucava da pogodjene karte ostanu okrenute na prednjoj strani
    function pogodak() {
        prva_karta.removeEventListener('click', okreniKartu);
        druga_karta.removeEventListener('click', okreniKartu);

        resetuj();
    }

    function promasaj() {

        dve_karte = true;

        setTimeout(() => {
            prva_karta.classList.remove('okreni');
            druga_karta.classList.remove('okreni');
            resetuj()
        }, 1000);

    };

    function resetuj() {
        okrenuta_karta = false;
        dve_karte = false;
        prva_karta = null;
        druga_karta = null;
    };


    // IIFE funkcija. Pokrece se odmah po ucitavanju stranice i nasumicno dodaje elementima flex svojstvo order
    (function izmesaj() {
        kartica.forEach(karta => {
            let pozicija = Math.floor(Math.random() * broj_karata);
            karta.style.order = pozicija;
        });
    })();

})

let nova_igra = document.getElementById("nova_igra");

// Klikom na dugme 'Nova igra' stranica se reloaduje
nova_igra.addEventListener('click', reloaduj);


function reloaduj() {
    document.location.reload();
};