// 1. DATA SIMULATION (Giả lập Database)
// Trong thực tế, đây có thể là file .json riêng hoặc fetch từ API
const blogPosts = [
    // --- POLYNESIA ---
    { id: 1, title: "Điệu nhảy Hula: Linh hồn của Hawaii", region: "Polynesia", country: "Hawaii", tags: ["Culture", "Dance"], img: "https://images.unsplash.com/photo-1542259659-4ab2877c2401", date: "2024-01-15" },
    { id: 2, title: "Lễ hội xăm mình Tattoo tại Samoa", region: "Polynesia", country: "Samoa", tags: ["Culture", "Art"], img: "https://images.unsplash.com/photo-1596323086961-419b6e87a270", date: "2024-02-10" },
    { id: 3, title: "Haka: Tiếng gầm của chiến binh Maori", region: "Polynesia", country: "New Zealand", tags: ["Culture", "History"], img: "https://images.unsplash.com/photo-1469521669194-babb45f835ae", date: "2024-03-05" },
    { id: 4, title: "Bí mật đằng sau hoa Lei", region: "Polynesia", country: "Hawaii", tags: ["Culture", "Nature"], img: "https://images.unsplash.com/photo-1589394666421-26c715974419", date: "2024-03-12" },
    { id: 5, title: "Ẩm thực Tahiti: Cá sống Poisson Cru", region: "Polynesia", country: "Tahiti", tags: ["Culture", "Food"], img: "https://images.unsplash.com/photo-1532966527582-730ce972627e", date: "2023-12-20" },
    
    // --- MELANESIA ---
    { id: 6, title: "Nghi lễ Kava tại Fiji", region: "Melanesia", country: "Fiji", tags: ["Culture", "Drink"], img: "https://images.unsplash.com/photo-1598327105654-706f9d453667", date: "2024-02-01" },
    { id: 7, title: "Bộ lạc vùng cao nguyên Papua", region: "Melanesia", country: "Papua New Guinea", tags: ["Culture", "People"], img: "https://images.unsplash.com/photo-1550850839-8dc894ed385a", date: "2024-01-20" },
    { id: 8, title: "Lặn biển xác tàu Vanuatu", region: "Melanesia", country: "Vanuatu", tags: ["Culture", "History"], img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5", date: "2023-11-15" },
    { id: 9, title: "Làng gốm truyền thống Fiji", region: "Melanesia", country: "Fiji", tags: ["Culture", "Art"], img: "https://images.unsplash.com/photo-1506929562872-bb421503ef21", date: "2023-10-10" },

    // --- MICRONESIA ---
    { id: 10, title: "Đá tiền Yap: Đơn vị tiền tệ khổng lồ", region: "Micronesia", country: "Yap", tags: ["Culture", "History"], img: "https://images.unsplash.com/photo-1596522518420-56247c7d424b", date: "2024-01-05" },
    { id: 11, title: "Truyền thuyết hồ sứa Palau", region: "Micronesia", country: "Palau", tags: ["Culture", "Nature"], img: "https://images.unsplash.com/photo-1551068832-720485662705", date: "2024-02-28" },
    { id: 12, title: "Chiến tranh Thái Bình Dương tại Guam", region: "Micronesia", country: "Guam", tags: ["Culture", "History"], img: "https://images.unsplash.com/photo-1518081461904-7d8fbed95449", date: "2023-09-15" },
    { id: 13, title: "Cuộc sống trên đảo san hô Kiribati", region: "Micronesia", country: "Kiribati", tags: ["Culture", "People"], img: "https://images.unsplash.com/photo-1542289139-44d5162a8427", date: "2023-08-20" }
];

// 2. CONFIG
const CURRENT_TOPIC = "Culture"; // Topic của trang này

// 3. CORE FUNCTIONS

// Hàm render bài viết ra HTML
function renderPosts(region, countryFilter = 'all') {
    const gridContainer = document.getElementById(`grid-${region.toLowerCase()}`);
    if (!gridContainer) return;

    // Filter Logic:
    // 1. Đúng Vùng (Region)
    // 2. Đúng Topic (Culture)
    // 3. Đúng Quốc gia (Nếu user chọn, còn 'all' thì lấy hết)
    let filteredPosts = blogPosts.filter(post => 
        post.region === region && 
        post.tags.includes(CURRENT_TOPIC)
    );

    if (countryFilter !== 'all') {
        filteredPosts = filteredPosts.filter(post => post.country === countryFilter);
    }

    // Sort theo ngày mới nhất
    filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Nếu chọn 'all' (Top Picks), chỉ lấy 4 bài đầu tiên
    const postsDisplay = countryFilter === 'all' ? filteredPosts.slice(0, 4) : filteredPosts;

    // Clear grid cũ
    gridContainer.innerHTML = '';

    // Render HTML
    if (postsDisplay.length === 0) {
        gridContainer.innerHTML = '<p class="no-data">Chưa có bài viết nào cho mục này.</p>';
        return;
    }

    postsDisplay.forEach(post => {
        const article = document.createElement('article');
        article.className = 'post-card';
        article.innerHTML = `
            <div class="card-img">
                <img src="${post.img}" alt="${post.title}" loading="lazy">
            </div>
            <div class="card-body">
                <span class="card-meta">${post.country}</span>
                <h3 class="card-title"><a href="#">${post.title}</a></h3>
                <span class="card-date">${post.date}</span>
            </div>
        `;
        gridContainer.innerHTML += article.outerHTML;
    });
}

// 4. INIT & EVENT LISTENERS
document.addEventListener('DOMContentLoaded', () => {
    // Render lần đầu (Top Picks cho cả 3 vùng)
    renderPosts("Polynesia", "all");
    renderPosts("Melanesia", "all");
    renderPosts("Micronesia", "all");

    // Xử lý sự kiện click nút lọc
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const clickedBtn = e.target;
            const country = clickedBtn.dataset.country;
            // Tìm vùng cha (để biết đang lọc cho vùng nào)
            const parentRegion = clickedBtn.closest('.country-filter').dataset.region;

            // Update UI (Active class)
            const siblings = clickedBtn.closest('.country-filter').querySelectorAll('.filter-btn');
            siblings.forEach(sib => sib.classList.remove('active'));
            clickedBtn.classList.add('active');

            // Re-render grid
            renderPosts(parentRegion, country);
        });
    });
});
