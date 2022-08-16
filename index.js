let navItem = ['Statical Data'];
let links = ["./index.html", "./aboutMe/aboutMe.html"]
let navElement = document.getElementById('navElement');
let navItemTemplate = ''
for (let i = 0; i < navItem.length; i++) {
    activeClass = i === 0 ? 'active' : ""
    navItemTemplate += `<a href="${links[i]}" class="list-group-item list-group-item-action py-2 ripple ${activeClass}">
    <i class="fas fa-tachometer-alt fa-fw me-3"></i><span>${navItem[i]}</span>
    </a>`
}

function navigate(i) {
    navItem.forEach((item, index) => {
        if (index === i) {
            document.getElementsByClassName(`list-group-item list-group-item-action py-2 ripple`)[index].classList.add('active');
        }
        else {
            document.getElementsByClassName(`list-group-item list-group-item-action py-2 ripple`)[index].classList.remove('active');
        }
    })

}
navElement.innerHTML = navItemTemplate;

