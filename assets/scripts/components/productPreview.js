export function renderProductPreview() {
    const productPreview = document.getElementById("product-preview");
    
    productPreview.innerHTML = `
        <div class="product-section">
            <div class="product-card">
                <h3>LEATHER BAGS</h3>
                <p>Bags that last for ages</p>
                <button>SHOP NOW</button>
            </div>
            <div class="product-card">
                <h3>VINTAGE DECOR</h3>
                <p>Let's take a trip down memory lane</p>
                <button>SHOP NOW</button>
            </div>
        </div>
    `;
}
