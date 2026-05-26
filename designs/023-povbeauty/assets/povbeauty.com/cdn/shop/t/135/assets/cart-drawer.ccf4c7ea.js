class CartDrawer extends HTMLElement{constructor(){super(),this.addEventListener("keyup",evt=>evt.code==="Escape"&&this.close()),this.querySelector("#CartDrawer-Overlay").addEventListener("click",this.close.bind(this)),this.setHeaderCartIconAccessibility(),document.addEventListener("rebuy.ready",this.initRebuyWidget.bind(this)),document.addEventListener("upsell-slider:init",this.initUpsellSlider.bind(this)),document.addEventListener("rebuy-widget:init",this.initRebuyWidget.bind(this))}initRebuyWidget(){const widgetContainer=this.querySelector("[js-rebuy-widget]");if(!widgetContainer.getAttribute("data-rebuy-widget-id"))return;const widget=Rebuy?.widgets?.find(widget2=>widget2.id===widgetContainer.getAttribute("data-rebuy-widget-id"));!widgetContainer||!widget||setTimeout(()=>{const{products,cart}=widget.data,lineItems=JSON.parse(this.querySelector("[js-cart-items-json]").textContent),filteredProducts=products?.filter(product=>!lineItems?.some(lineItem=>lineItem.product_id===product.id)&&product.selected_variant.inventory_quantity>0);if(filteredProducts?.length)this.renderRebuyWidget(widgetContainer,filteredProducts),widgetContainer.classList.remove("hidden");else{const productsGrid=widgetContainer.querySelector("[js-rebuy-products]");productsGrid.innerHTML="",widgetContainer.classList.add("hidden")}},200)}renderRebuyWidget(widget,products){const productsGrid=widget.querySelector("[js-rebuy-products]");productsGrid.innerHTML="",products.forEach(product=>{let featuredImg=product.image.src;if(productsMeta?.length){const productData=productsMeta.find(el=>el.id===product.id);productData?.img&&(featuredImg=productData.img)}const productRte=product.metafields?.custom?.product_grid_short_detail_text&&JSON.parse(product.metafields?.custom?.product_grid_short_detail_text),detaisList=product.metafields?.custom?.product_grid_short_detail_text_list&&JSON.parse(product.metafields?.custom?.product_grid_short_detail_text_list);let product_custom_title=product.title;if(product.metafields?.custom?.product_custom_title)try{product_custom_title=JSON.parse(product.metafields.custom.product_custom_title)}catch{product_custom_title=product.metafields.custom.product_custom_title}fetch(`${location.origin}/products/${product.handle}.js`).then(res=>res.json()).then(prod=>{const marketPrice=prod.variants.find(v=>v.id==product.selected_variant.id).price,productItemHtml=`
        <div class="swiper-slide upsell-item">
            <div class="cart-upsell__card-wrapper">
                <a href="/products/${product.handle}" class="cart-upsell__layout"></a>
                 ${product.image?.src?`<div class="cart-upsell__image">
                        <img src="${featuredImg}" alt="">
                    </div>`:""}
                <div class="cart-upsell__info">
                  <div class="cart-upsell__meta">
                    <h2 class="cart-upsell__title">${product_custom_title}</h2>
                    ${productRte?`
                      <div class="cart-upsell__detail--info">
                        <p>${productRte?.children[0]?.children[0]?.value}</p>
                      </div>
                      `:""}
                    ${detaisList&&detaisList.length>0?`
                      <div class="cart-upsell__detail--text">
                          ${detaisList.map((item,index)=>`${item}${index<detaisList.length-1?",":""}`).join(" ")}
                      </div>
                      `:""}
                </div>
               
                <div class="cart-upsell__btn">
                    <product-form>
                        <form method="post" action="/cart/add" accept-charset="UTF-8" class="form" enctype="multipart/form-data" novalidate="novalidate" data-type="add-to-cart-form">
                          <input
                              type="hidden"
                              name="id"
                              value="${product.selected_variant.id}"
                              class="product-variant-id"
                          >
                          <button
                              type="submit"
                              name="add"
                              class="quick-add__submit button--full-width button--secondary"
                          >
                              <div class="loading__spinner hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" class="spinner" viewBox="0 0 66 66"><circle stroke-width="6" cx="33" cy="33" r="30" fill="none" class="path"/></svg>
                              </div>
                              <span>
                                  add to cart
                              </span>
                              <span> - </span>
                              <span class="cart-upsell__regular-price">$${Number(marketPrice/100).toString()}</span>
                        </button>
                        </form>
                    </product-form>
                </div>
                </div>
            </div>
        </div>
      `;productsGrid.insertAdjacentHTML("beforeend",productItemHtml)})}),document.dispatchEvent(new CustomEvent("upsell-slider:init"))}initUpsellSlider(){new Swiper("[js-upsell-slider]",{slidesPerView:"auto",spaceBetween:12,freeMode:!0,watchSlidesProgress:!0,draggable:!0,autoHeight:!1,watchOverflow:!0,threshold:10,mousewheel:{forceToAxis:!0}})}setHeaderCartIconAccessibility(){const cartLink=document.querySelector("#cart-icon-bubble");cartLink&&(cartLink.setAttribute("role","button"),cartLink.setAttribute("aria-haspopup","dialog"),cartLink.addEventListener("click",event=>{event.preventDefault(),this.open(cartLink)}),cartLink.addEventListener("keydown",event=>{event.code.toUpperCase()==="SPACE"&&(event.preventDefault(),this.open(cartLink))}))}open(triggeredBy){triggeredBy&&this.setActiveElement(triggeredBy);const cartDrawerNote=this.querySelector('[id^="Details-"] summary');cartDrawerNote&&!cartDrawerNote.hasAttribute("role")&&this.setSummaryAccessibility(cartDrawerNote),setTimeout(()=>{this.classList.add("animate","active")}),this.addEventListener("transitionend",()=>{const containerToTrapFocusOn=this.classList.contains("is-empty")?this.querySelector(".drawer__inner-empty"):document.getElementById("CartDrawer"),focusElement=this.querySelector(".drawer__inner")||this.querySelector(".drawer__close");trapFocus(containerToTrapFocusOn,focusElement)},{once:!0}),document.body.classList.add("overflow-hidden")}close(){this.classList.remove("active"),removeTrapFocus(this.activeElement),document.body.classList.remove("overflow-hidden")}setSummaryAccessibility(cartDrawerNote){cartDrawerNote.setAttribute("role","button"),cartDrawerNote.setAttribute("aria-expanded","false"),cartDrawerNote.nextElementSibling.getAttribute("id")&&cartDrawerNote.setAttribute("aria-controls",cartDrawerNote.nextElementSibling.id),cartDrawerNote.addEventListener("click",event=>{event.currentTarget.setAttribute("aria-expanded",!event.currentTarget.closest("details").hasAttribute("open"))}),cartDrawerNote.parentElement.addEventListener("keyup",onKeyUpEscape)}renderContents(parsedState){this.querySelector(".drawer__inner").classList.contains("is-empty")&&this.querySelector(".drawer__inner").classList.remove("is-empty"),this.productId=parsedState.id,this.getSectionsToRender().forEach(section=>{const sectionElement=section.selector?document.querySelector(section.selector):document.getElementById(section.id);sectionElement&&(sectionElement.innerHTML=this.getSectionInnerHTML(parsedState.sections[section.id],section.selector))}),setTimeout(()=>{this.querySelector("#CartDrawer-Overlay").addEventListener("click",this.close.bind(this)),this.open(),document.dispatchEvent(new CustomEvent("rebuy-widget:init")),document.dispatchEvent(new CustomEvent("upsell-slider:init"))})}getSectionInnerHTML(html,selector=".shopify-section"){return new DOMParser().parseFromString(html,"text/html").querySelector(selector).innerHTML}getSectionsToRender(){return[{id:"cart-drawer",selector:"#CartDrawer"},{id:"cart-icon-bubble"}]}getSectionDOM(html,selector=".shopify-section"){return new DOMParser().parseFromString(html,"text/html").querySelector(selector)}setActiveElement(element){this.activeElement=element}}customElements.define("cart-drawer",CartDrawer);class CartDrawerItems extends CartItems{getSectionsToRender(){return[{id:"CartDrawer",section:"cart-drawer",selector:".drawer__inner"},{id:"cart-icon-bubble",section:"cart-icon-bubble",selector:".shopify-section"}]}}customElements.define("cart-drawer-items",CartDrawerItems);
//# sourceMappingURL=/cdn/shop/t/135/assets/cart-drawer.js.map?v=40385278456952728321761296247
