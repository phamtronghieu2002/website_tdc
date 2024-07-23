const categoryListName = $$_('.category-name-item');

$('.carousel').carousel({ interval: 5000 });

categoryListName.forEach((categoryName) => {
    categoryName.onclick = (e) => {
        const id = categoryName.getAttribute('data');
        const categoryGroup = document.getElementById(id);
        if (categoryGroup) {
            categoryGroup.scrollIntoView({
                behavior: 'smooth',
                // block: "start",
                block: 'center',
            });
        }
    };
});
