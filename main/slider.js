const track = document.getElementById("image-track");

const handleOnDown = (e) => {
    track.dataset.mouseDownAt = e.clientX || e.touches[0].clientX;
    track.style.cursor = "grabbing";
};

const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
    track.style.cursor = "grab";
};

const handleOnMove = (e) => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - (e.clientX || e.touches[0].clientX);
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;
    const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage || "0") + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;

    track.style.transform = `translate(${nextPercentage}%, -50%)`;

    for (const image of track.getElementsByClassName("image")) {
        image.style.objectPosition = `${100 + nextPercentage}% center`;
    }
};

track.addEventListener("mousedown", (e) => handleOnDown(e));
track.addEventListener("mouseup", () => handleOnUp());
track.addEventListener("mouseleave", () => handleOnUp());
track.addEventListener("mousemove", (e) => handleOnMove(e));

track.addEventListener("touchstart", (e) => handleOnDown(e));
track.addEventListener("touchend", () => handleOnUp());
track.addEventListener("touchmove", (e) => handleOnMove(e));

const loadImages = () => {
    const imageSources = [
        "https://galerie.eduardogomez.io/content/images/size/w1000/2022/06/howard-bouchevereau-2Q-pPfHZHyo-unsplash_o.jpg",
        "https://i.etsystatic.com/37807868/r/il/b40c6b/5949456771/il_fullxfull.5949456771_1jtl.jpg",
        "https://assets-prd.ignimgs.com/2022/09/12/apple-airpods-pro-2nd-gen-hero-220907-1662579992347-1662989441835.jpg",
        "https://i.pinimg.com/1200x/46/e8/22/46e8221d9b37fb6e77023660e0c631fb.jpg",
        "https://i.pinimg.com/736x/28/90/31/28903130b9cf5a138a48b7163707bfd1.jpg",
        "https://imageio.forbes.com/specials-images/imageserve/65496ba1379f809520ffebbf/0x0.jpg?format=jpg&height=600&width=1200&fit=bounds",
        "https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/tile/Apple-iPhone-15-Pro-lineup-hero-230912.jpg.news_app_ed.jpg"
    ];

    imageSources.forEach((src, index) => {
        const imageItem = document.createElement("div");
        imageItem.className = "image-item";

        const img = document.createElement("img");
        img.className = "image";
        img.src = src;
        img.draggable = false;
        img.width = 400;
        img.height = 300;

        const caption = document.createElement("h2");
        caption.textContent = `Image ${index + 1}`;

        imageItem.appendChild(img);
        imageItem.appendChild(caption);

        track.appendChild(imageItem);
    });
};

window.onload = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = "0";
    track.style.cursor = "grab";
    loadImages();
};
