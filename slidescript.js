// Auto Slider Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Start the slider
showSlide(currentSlide);
setInterval(nextSlide, 3000); // Change slide every 3 seconds

// Order Processing Functionality
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const taste = document.querySelector('input[name="taste"]:checked');
    const size = document.querySelector('input[name="size"]:checked');
    const delivery = document.querySelector('select[name="delivery"]').value;
    
    // Validate form
    if (!name || !taste || !size) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Calculate price based on size
    let price;
    switch(size.value) {
        case 'small':
            price = 12.99;
            break;
        case 'medium':
            price = 16.99;
            break;
        case 'large':
            price = 21.99;
            break;
    }
    
    // Add delivery fee for same-day delivery
    if (delivery === 'same-day') {
        price += 3.99;
    }
    
    // Create order summary
    const orderSummary = `
        <div class="order-summary">
            <h2>Order Complete!</h2>
            <p>Thank you, <strong>${name}</strong>!</p>
            <p>Your <strong>${size.value}</strong> <strong>${taste.value}</strong> roasted chicken is on its way!</p>
            <p>Delivery: <strong>${delivery.replace('-', ' ')}</strong></p>
            <p class="total">Total: <strong>$${price.toFixed(2)}</strong></p>
            <button onclick="location.reload()">Place Another Order</button>
        </div>
    `;
    
    // Replace form with order summary
    document.querySelector('.form-container').innerHTML = orderSummary;
    
    // Scroll to the order summary
    document.querySelector('.order-summary').scrollIntoView({ behavior: 'smooth' });
});
