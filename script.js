// 1. DATA CONFIGURATION
const CURRENT_TOPIC = "Culture"; 
const DOMAIN_URL = "https://stories.polynesianpride.co/"; // Thay bằng domain thật của bạn

// Database Bài Viết (Giữ nguyên hoặc cập nhật thêm)
const blogPosts = [
    // --- POLYNESIA ---
    { id: 1, title: "Điệu nhảy Hula: Linh hồn của Hawaii", region: "Polynesia", country: "Hawaii", tags: ["Culture", "Dance"], img: "https://images.unsplash.com/photo-1542259659-4ab2877c2401?q=80&w=600&auto=format&fit=crop", date: "2024-01-15" },
    { id: 2, title: "Lễ hội xăm mình Tattoo tại Samoa", region: "Polynesia", country: "Samoa", tags: ["Culture", "Art"], img: "https://images.unsplash.com/photo-1596323086961-419b6e87a270?q=80&w=600&auto=format&fit=crop", date: "2024-02-10" },
    { id: 3, title: "Haka: Tiếng gầm của chiến binh Maori", region: "Polynesia", country: "New Zealand", tags: ["Culture", "History"], img: "https://images.unsplash.com/photo-1469521669194-babb45f835ae?q=80&w=600&auto=format&fit=crop", date: "2024-03-05" },
    { id: 4, title: "Bí mật đằng sau hoa Lei", region: "Polynesia", country: "Hawaii", tags: ["Culture", "Nature"], img: "https://images.unsplash.com/photo-1589394666421-26c715974419?q=80&w=600&auto=format&fit=crop", date: "2024-03-12" },
    { id: 5, title: "Ẩm thực Tahiti: Cá sống Poisson Cru", region: "Polynesia", country: "Tahiti", tags: ["Culture", "Food"], img: "https://images.unsplash.com/photo-1532966527582-730ce972627e?q=80&w=600&auto=format&fit=crop", date: "2023-12-20" },
    
    // --- MELANESIA ---
    { id: 6, title: "Nghi lễ Kava tại Fiji", region: "Melanesia", country: "Fiji", tags: ["Culture", "Drink"], img: "https://images.unsplash.com/photo-1598327105654-706f9d453667?q=80&w=600&auto=format&fit=crop", date: "2024-02-01" },
    { id: 7, title: "Bộ lạc vùng cao nguyên Papua", region: "Melanesia", country: "Papua New Guinea", tags: ["Culture", "People"], img: "https://images.unsplash.com/photo-1550850839-8dc894ed385a?q=80&w=600&auto=format&fit=crop", date: "2024-01-20" },
    { id: 8, title: "Lặn biển xác tàu Vanuatu", region: "Melanesia", country: "Vanuatu", tags: ["Culture", "History"], img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=600&auto=format&fit=crop", date: "2023-11-15" },
    
    // --- MICRONESIA ---
    { id: 10, title: "Đá tiền Yap: Đơn vị tiền tệ khổng lồ", region: "Micronesia", country: "Yap", tags: ["Culture", "History"], img: "https://images.unsplash.com/photo-1596522518420-56247c7d424b?q=80&w=600&auto=format&fit=crop", date: "2024-01-05" },
    { id: 11, title: "Truyền thuyết hồ sứa Palau", region: "Micronesia", country: "Palau", tags: ["Culture", "Nature"], img: "https://images.unsplash.com/photo-1551068832-720485662705?q=80&w=600&auto=format&fit=crop", date: "2024-02-28" },
    { id: 12, title: "Chiến tranh Thái Bình Dương tại Guam", region: "Micronesia", country: "Guam", tags: ["Culture", "History"], img: "https://images.unsplash.com/photo-1518081461904-7d8fbed95449?q=80&w=600&auto=format&fit=crop", date: "2023-09-15" }
];

// Database Mô tả động (Key = Tên Vùng hoặc Tên Quốc gia)
const topicDescriptions = {
    // Default Region Descriptions
    "Polynesia": "Khám phá tam giác Polynesia huyền bí với Hawaii, New Zealand và Samoa. Nơi khởi nguồn của văn hóa lướt sóng và xăm mình.",
    "Melanesia": "Vùng đất của những hòn đảo đen, đa dạng ngôn ngữ nhất thế giới. Trải nghiệm văn hóa thổ dân nguyên sơ tại Fiji và Papua New Guinea.",
    "Micronesia": "Hàng ngàn đảo nhỏ rải rác như ngọc. Tìm hiểu lịch sử Thế chiến II và văn hóa hàng hải của người dân đảo san hô.",

    // Country Specific Descriptions (Tăng CTA)
    "Hawaii": "Aloha! Đắm mình trong điệu Hula và truyền thuyết các vị thần lửa Pele.",
    "New Zealand": "Kia Ora! Khám phá văn hóa Maori hào hùng qua điệu Haka và nghệ thuật chạm khắc gỗ.",
    "Samoa": "Talofa! Trải nghiệm lối sống Fa'a Samoa gìn giữ suốt 3000 năm.",
    "Tahiti": "Viên ngọc xanh của Pháp. Sự pha trộn tinh tế giữa văn hóa Polynesia và lãng mạn châu Âu.",
    "Fiji": "Bula! Thưởng thức Kava và lòng hiếu khách nồng hậu nhất thế giới.",
    "Vanuatu": "Vùng đất của núi lửa và những bộ lạc cổ xưa chưa bị thời gian chạm tới.",
    "Papua New Guinea": "Hơn 800 ngôn ngữ và những lễ hội Sing-sing đầy màu sắc bí ẩn.",
    "Palau": "Thiên đường lặn biển và bảo tồn văn hóa mẫu hệ độc đáo.",
    "Guam": "Nơi giao thoa văn hóa Chamorro bản địa và ảnh hưởng hiện đại của Mỹ."
};

// 2. HELPER FUNCTIONS

// Hàm chuyển text thành slug URL (VD: "New Zealand" -> "new-zealand")
function toSlug(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-')   // Replace multiple - with single -
        .replace(/^-+/, '')       // Trim - from start of text
        .replace(/-+$/, '');      // Trim - from end of text
}

// 3. CORE LOGIC

function updateUI(region, country) {
    // A. Update Description Text
    const descElement = document.getElementById(`desc-${region.toLowerCase()}`);
    const linkElement = document.getElementById(`link-${region.toLowerCase()}`);
    
    // Hiệu ứng fade nhẹ
    descElement.classList.add('fading');
    
    setTimeout(() => {
        // Nếu chọn "all", lấy mô tả chung của Vùng. Nếu chọn QG, lấy mô tả QG.
        const descKey = country === 'all' ? region : country;
        // Fallback: Nếu không có mô tả riêng, dùng mô tả Vùng
        const text = topicDescriptions[descKey] || topicDescriptions[region];
        
        descElement.textContent = text;
        descElement.classList.remove('fading');
    }, 200);

    // B. Update CTA Link (View All)
    // Format: domain.com/blogs/[country-slug]/tagged/[topic-slug]
    const topicSlug = toSlug(CURRENT_TOPIC);
    let finalUrl = "#";
    let linkText = "Xem tất cả bài viết";

    if (country === 'all') {
        // Link về danh mục Vùng
        finalUrl = `${DOMAIN_URL}/blogs/${toSlug(region)}/tagged/${topicSlug}`;
        linkText = `Xem tất cả ${region} (${CURRENT_TOPIC})`;
    } else {
        // Link về danh mục Quốc gia
        finalUrl = `${DOMAIN_URL}/blogs/${toSlug(country)}/tagged/${topicSlug}`;
        linkText = `Xem tất cả ${country} (${CURRENT_TOPIC})`;
    }

    linkElement.href = finalUrl;
    linkElement.innerHTML = `${linkText} <span class="arrow">→</span>`;

    // C. Render Grid
    renderPosts(region, country);
}

function renderPosts(region, countryFilter) {
    const gridContainer = document.getElementById(`grid-${region.toLowerCase()}`);
    if (!gridContainer) return;

    let filteredPosts = blogPosts.filter(post => 
        post.region === region && 
        post.tags.includes(CURRENT_TOPIC)
    );

    if (countryFilter !== 'all') {
        filteredPosts = filteredPosts.filter(post => post.country === countryFilter);
    }

    // Sort mới nhất
    filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Top Picks logic: Chỉ lấy 4 bài nếu là All, hoặc lấy hết nếu chọn Country
    const postsDisplay = countryFilter === 'all' ? filteredPosts.slice(0, 4) : filteredPosts;

    gridContainer.innerHTML = '';

    if (postsDisplay.length === 0) {
        gridContainer.innerHTML = '<div class="no-data">Chưa có bài viết nào cho mục này.</div>';
        return;
    }

    postsDisplay.forEach(post => {
        // Xử lý fallback ảnh nếu lỗi (onerror)
        const fallbackImg = "https://placehold.co/600x400?text=No+Image"; 
        
        const article = document.createElement('article');
        article.className = 'post-card';
        article.innerHTML = `
            <div class="card-img">
                <img src="${post.img}" 
                     alt="${post.title}" 
                     loading="lazy"
                     onerror="this.onerror=null;this.src='${fallbackImg}';"
                >
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

// 4. EVENT LISTENERS
document.addEventListener('DOMContentLoaded', () => {
    // Init Load
    updateUI("Polynesia", "all");
    updateUI("Melanesia", "all");
    updateUI("Micronesia", "all");

    // Click Handlers
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const clickedBtn = e.target;
            const country = clickedBtn.dataset.country;
            const parentRegion = clickedBtn.closest('.country-filter').dataset.region;

            // UI Active State
            const siblings = clickedBtn.closest('.country-filter').querySelectorAll('.filter-btn');
            siblings.forEach(sib => sib.classList.remove('active'));
            clickedBtn.classList.add('active');

            // Trigger Update UI (Desc + Link + Grid)
            updateUI(parentRegion, country);
        });
    });
});
