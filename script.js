let cart = [];
let modalQt = 2;
let modalKey = 0;

const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);

camisaJson.map((item, index)=>{ 
    let pizzaItem = document.querySelector('.models .camisa-item').cloneNode(true);
    
    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.camisa-item--img img').src = item.img;
    pizzaItem.querySelector('.camisa-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.camisa-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.camisa-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();

        let key = e.target.closest('.camisa-item').getAttribute('data-key');
        modalQt = 1;
        modalKey = key;
        


        c('.pizzaBig img').src = camisaJson[key].img 
        c('.pizzaInfo h1').innerHTML = camisaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = camisaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${camisaJson[key].price.toFixed(2)}`;
        c('.pizzaInfo--size.selected').classList.remove('selected');
        cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            if(sizeIndex == 2) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = camisaJson[key].sizes[sizeIndex];
        });
        c('.pizzaInfo--qt').innerHTML = modalQt;
        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200);


    });

    c('.camisa-area').append(pizzaItem);

    }); 

    //Eventos do modal
    function closeModal () {
        c('.pizzaWindowArea').style.opacity = 0;
        setTimeout(()=>{
            c('.pizzaWindowArea').style.display= 'none';
        }, 500);
    }
    cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
     
        item.addEventListener('click',closeModal);
    });
    c('.pizzaInfo--qtmenos').addEventListener('click',()=>{
       if( modalQt > 1 ) { modalQt--;
        c('.pizzaInfo--qt').innerHTML = modalQt; }
    });
    c('.pizzaInfo--qtmais').addEventListener('click',()=>{
        modalQt++;
        c('.pizzaInfo--qt').innerHTML = modalQt;
    });
    
    cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
        size.addEventListener('click', (e)=>{
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
        });
    });
    c('.pizzaInfo--addButton').addEventListener('click', ()=>{
     console.log('camisa:'+modalKey)
     let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));
     
     //As mesmas pizzas escolhidas tem que estar juntas, mesmo depois de ja te-las escolhido...
     let identifier = camisaJson[modalKey].id+'@'+size;

     let key = cart.findIndex ((item)=>item.identifier == identifier);
     if(key > -1) {
      cart[key].qt += modalQt;
     }
     else {
     cart.push({
        identifier,
        id:camisaJson[modalKey].id,
        size,
        qt:modalQt
     });
    }
    updateCart();
     closeModal();
    });
    c('.menu-closer').addEventListener('click', ()=>{
        c('aside').style.left = '100vw';
    });

    c('.menu-openner').addEventListener('click', () => {
        if(cart.length > 0) {
        c('aside').style.left = '0'; }
    });

    function updateCart() {

        c('.menu-openner span').innerHTML = cart.length;



        if(cart.length > 0) {
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;


        for (let i in cart) {
            let pizzaItem = camisaJson.find((item)=>item.id == cart[i].id)
            let cartItem = c('.models .cart--item').cloneNode(true);
            subtotal += pizzaItem.price * cart[i].qt;

            
            let pizzaSizeName;
            switch(cart[i].size) {
                case 0:
                    pizzaSizeName = 'P';
                break;
                case 1:
                    pizzaSizeName = 'M';
                break;
                case 2:
                    pizzaSizeName = 'G';
                break;
            }


            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;


            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{

                if(cart[i].qt > 1) {
                cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                }
                updateCart();
            });

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++;
                updateCart();
            });

            c('.cart').append(cartItem)
        }
        

        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
    }
         else {
            c('aside').classList.remove('show');
            c('aside').style.left = '100vw';
        }
     }










































































































/*let modalQt = 1;
let modalKey = 0;

const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);

pizzaJson.map((item,index)=>{
let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true);

pizzaItem.setAttribute('data-key', index);
pizzaItem.querySelector('.pizza-item--img img').src = item.img;
pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$: ${item.price.toFixed(2)}`
pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

pizzaItem.querySelector('a').addEventListener('click', (e)=>{
e.preventDefault();
let key = e.target.closest('.pizza-item').getAttribute('data-key');

modalQt = 0;
modalKey = key;


c('.pizzaBig img').src = pizzaJson[key].img;
c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
c('.pizzaInfo .pizzaInfo--desc').innerHTML = pizzaJson[key].description;
c('.pizzaInfo--actualPrice').innerHTML = pizzaJson[key].price.toFixed(2);

c('.pizzaInfo--size.selected').classList.remove('selected');
cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    if(sizeIndex == 2){
        size.classList.add('selected');
    }
    size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];//I guess key take every itens & sizeIndex the number from itens
});



c('.pizzaInfo--qt').innerHTML = modalQt;
c('.pizzaWindowArea').style.opacity = 0;
c('.pizzaWindowArea').style.display = 'flex';
setTimeout(()=>{
    c('.pizzaWindowArea').style.opacity = 1;
}, 200);

});



c('.pizza-area').append(pizzaItem);
});

//Eventos do modal

function closeModal() {
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
      c('.pizzaWindowArea').style.display = 'none';
      
    },500);
}
cs('.pizzaInfo--cancelMobileButton,.pizzaInfo--cancelButton').forEach((item)=>{
    item.addEventListener('click',closeModal)
})
c('.pizzaInfo--qtmenos').addEventListener('click',()=>{
    if(modalQt>1){
     modalQt--;
     c('.pizzaInfo--qt').innerHTML = modalQt;
    }
 });
 c('.pizzaInfo--qtmais').addEventListener('click',()=>{
     modalQt++;
     c('.pizzaInfo--qt').innerHTML = modalQt;
 });

 cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (e)=>{
    c('.pizzaInfo--size.selected').classList.remove('selected');
    size.classList.add('selected');
    });
});
c('.pizzaInfo--addButton').addEventListener('click',()=>{
//Qual a pizza?
console.log("essa e a pizza "+modalKey)
//Qual o tamanho?
let size = c('.pizzaInfo--size.selected').getAttribute('data-key');
console.log('O tamanho e '+size)
//Quantas pizzas?
console.log('A quantidade e de pizzas e '+modalQt)
});*/