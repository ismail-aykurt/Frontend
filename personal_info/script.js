//Ekleme ekranı id'leri
const id_button = document.getElementById('id-button');
const id_paragraf = document.getElementById('id-paragraf');
const ad_input = document.getElementById("ad-input");
const soyad_input = document.getElementById("soyad-input");
const tc_input = document.getElementById("tc-input");
const tel_input = document.getElementById("tel-input");

// Düzenleme ekranı id'leri
const gonder = document.getElementById("gonder");
const ad_input2 = document.getElementById("ad-input2");
const soyad_input2 = document.getElementById("soyad-input2");
const tc_input2 = document.getElementById("tc-input2");
const tel_input2 = document.getElementById("tel-input2");
const edit_id_label = document.getElementById('edit-id');
const duzenle_button = document.getElementById("duzenle");

// Kutu içerisini temizleme
const clearInputs = () => {   //Arrow fonksiyon tanımlanarak form içeriği temizlendi. Bu sayede kullanıcı 
  ad_input.value = '';        //her seferinde silmek zorunda kalmıyor
  soyad_input.value = '';
  tc_input.value = '';
  tel_input.value = '';
  ad_input2.value = '';
  soyad_input2.value = '';
  tc_input2.value = '';
  tel_input2.value = '';
  document.getElementById("input-delete").value = '';  //No&ID içeriği temizle
};


clearInputs();

let id_number = 1000000;  
let num_sayisi = 0;
let edit_index = null;
const buton_delete = document.getElementById("buton-delete");
const buton_deleteAll = document.getElementById("buton-deleteAll");

// Buton fonksiyonları oluşturma
id_button.addEventListener('click', idOlustur);
gonder.addEventListener('click', kisiEkle);
buton_delete.addEventListener('click', deleteSearch);
buton_deleteAll.addEventListener('click', deleteAll);
duzenle_button.addEventListener('click', kisiDuzenle);

/*ID oluşturma fonksiyonu. Burada, yukarıda tanımlanan ön tanımlı değeri 100000 olan id, kullanıcı  
  tarafından oluşturulan id içerik olarak tanımlanan paragrafa ekleniyor. Önce içerik bir bir arttırılıp
  daha sonra içerik olarak eklenir*/  
function idOlustur() {
  id_number++;
  id_paragraf.textContent = id_number;
}

// Kişi ekleme fonksiyonu
function kisiEkle() {  //KisiEkle adında fonksiyon tanımlandı
  //yukarıda tanımlanan değişkenler her biri tekrar birer değişkene atanarak ve trim metodu ile başında 
  //ve sonunda olan boşluklar temizlenir. Bu sayede daha okunaklı ve düzenli olma amaçlanmıştır
  const adText = ad_input.value.trim();  
  const soyadText = soyad_input.value.trim();
  const tcText = tc_input.value.trim();
  const telText = tel_input.value.trim();

  //Zorunlu alan kontorlu yapılmaktadır. Kullanıcı herhangi zorunlu bir alanı girmediğinde uyarı mesajı 
  //gösterilir. === kullanmamızın sebebi tür kontolü de yapmasını sağlamaktır.
  if (adText === '' || soyadText === '' || tcText === '') {
    alert('Lütfen * ile gösterilen zorunlu alanları doldurun!');
    return;
  }

  num_sayisi++; //İf bloguna takılmayan kod diğer satırlara devam eder ve kullanıcı eklenmeden önce no birer artırıldı

  const numaraDiv = document.querySelector('.numara');  //Eklenecek yeri sabite atama işlemi yapıldı
  const ul = document.createElement('ul');  //Yeni bir ul listesi oluşturuldu ve arka rengi verildi
  ul.style.backgroundColor = "white";
  
  const items = [num_sayisi, id_number, adText, soyadText, tcText, telText];
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });

  // Silme tuşu ekle
  const img2 = document.createElement('img');
  img2.src = "silme.png";
  img2.style.height = "15px";
  
  img2.className = "delete";
  img2.addEventListener('click', function () {
    ul.remove();
  });

  // Düzenleme tuşu ekle
  const img3 = document.createElement('img');
  img3.src = "duzenleme.png";
  img3.style.height = "15px";
  img3.className = "edit";
  img3.addEventListener('click', function () {
    const lis = ul.getElementsByTagName('li');
    edit_index = num_sayisi;
    ad_input2.value = lis[2].textContent;
    soyad_input2.value = lis[3].textContent;
    tc_input2.value = lis[4].textContent;
    tel_input2.value = lis[5].textContent;
    edit_id_label.textContent = lis[1].textContent;
  });

  ul.appendChild(img2);
  ul.appendChild(img3);

  // Listeyi ekle
  numaraDiv.appendChild(ul);
  
  clearInputs();
}

function kisiDuzenle() {
  if (edit_index === null) {
    alert('Düzenlemek için bir öğe seçin.');
    return;
  }

  const numaraDiv = document.querySelector('.numara');
  const lists = numaraDiv.getElementsByTagName('ul');
  
  for (let i = 1; i < lists.length; i++) {  // Skip the header
    const ul = lists[i];
    const lis = ul.getElementsByTagName('li');
    
    if (lis[0].textContent == edit_index) {
      lis[2].textContent = ad_input2.value;
      lis[3].textContent = soyad_input2.value;
      lis[4].textContent = tc_input2.value;
      lis[5].textContent = tel_input2.value;
      break;
    }
  }

  clearInputs();
  edit_index = null;
  edit_id_label.textContent = '1000001';
}

function deleteSearch() {
  const inputValue = document.getElementById('input-delete').value;
  const listsContainer = document.querySelector('.numara');
  const lists = listsContainer.getElementsByTagName('ul');
  
  if (inputValue !== "") {
    for (let i = 0; i < lists.length; i++) {
      const ul = lists[i];
      const lis = ul.getElementsByTagName('li');
      
      for (let j = 0; j < lis.length; j++) {
        const li = lis[j];
        if (li.textContent.trim() === inputValue) {
          listsContainer.removeChild(ul);
          break;
        }
      }
    }
  }
  document.getElementById('input-delete').value = '';
}

function deleteAll() {
  const numaraDiv = document.querySelector('.numara');
  numaraDiv.innerHTML = ''; // Tüm içeriği temizle
  id_number = 1000000;
  num_sayisi = 0;
  const ul = document.createElement('ul');
  const items = ["NO", "ID", "AD", "SOYAD", "TC", "TELEFON"];
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
  numaraDiv.appendChild(ul);
}

// Başlangıçta tablo başlıklarını ekleyelim
deleteAll();
