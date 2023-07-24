// สร้าง Card แสดงข้อมูล
function createCard(item) {
    return `
        <div class="card">
            <div class="card-body">
                <figure class="card-body__thumbnail">
                    <img src="${item.image_url}" alt="${item.title}">
                </figure>
                <figcaption class="card-body__detail">
                    <h3 class="card-title">${item.title}</h3>
                    <p class="meta-date">${getTimeSinceCreation(item.created_at)} ago</p>
                    <div class="rating">
                        ${getRatingStars(item.vote)}
                    </div>
                    <p class="currency">฿ ${item.price}</p>
                </figcaption>
            </div>   
        </div>
    `;
}

// สร้างดาวตามคะแนน Rating
function getRatingStars(rating) {
    let stars = '';

    for (let i = 1; i <= 5; i++) {
        stars += `<span ${i <= rating ? 'data-rating="1"' : 'data-rating="0"'}>&#9733;</span>`;
    }

    return stars;
}

// คำนวณระยะเวลาที่ผ่านมาตั้งแต่วันที่สร้างไปถึงวันปัจจุบัน
function getTimeSinceCreation(createdAt) {
    const now = new Date();
    const createdDate = new Date(createdAt);

    const timeDifference = now - createdDate;
    const days = timeDifference / (1000 * 60 * 60 * 24);
    const weeks = days / 7;
    const months = days / 30.44; // ประมาณ 30.44 วันในเดือน
    const years = days / 365.25; // ประมาณ 365.25 วันในปี (คำนวณเพื่อความเท่าเทียม)

    if(years > 0){
        return `${Math.floor(years)} years`;
    }else if(months > 0){
        return `${Math.floor(months)} months`;
    }else if(weeks > 0){
        return `${Math.floor(weeks)} weeks`;
    }else if(days){
        return `${Math.floor(days)} days`;
    }else{
        return `Just posted`;
    }
    
}

// ดึงข้อมูล JSON จากไฟล์
fetch('./homework-challenges/list.json')
.then(response => response.json())
.then(data => {
    const dataContainer = document.getElementById('data-container');
    const firstIndex = document.getElementById('first-index');
    const dataCount = document.getElementById('data-count');
    const dataAll = document.getElementById('data-all');
    let count = 0;

    data.forEach(item => {
        const card = createCard(item);
        dataContainer.innerHTML += card;
        count++;
    });
    
    firstIndex.textContent = 1;
    dataCount.textContent = count;
    dataAll.textContent = 23;
})
.catch(error => console.error('Error fetching data:', error));