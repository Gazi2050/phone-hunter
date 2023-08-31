
const loadPhone = async (searchText = 12, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data
    displayPhones(phones, isShowAll)

}

const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container')

    phoneContainer.textContent = '';

    const ShowAllContainer = document.getElementById('show-all-container')
    if (phones.length > 12 && !isShowAll) {
        ShowAllContainer.classList.remove('hidden');
    }
    else {
        ShowAllContainer.classList.add('hidden');
    }

    if (!isShowAll) {
        phones = phones.slice(0, 12)
    }

    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-50 shadow-xl p-2`
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p class="font-semibold">$999</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard)
    });
    toggleLoadingSpinner(false);
}

const handleShowDetails = async (id) => {
    // console.log('click', id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const phone = data.data
    ShowPhoneDetails(phone)
}
const ShowPhoneDetails = (phone) => {
    const phoneName = document.getElementById('show-detail-phone-name')
    phoneName.innerText = phone.name;
    const showDetailContainer = document.getElementById('show-detail-container')
    showDetailContainer.innerHTML = `
    <img src="${phone.image}" alt="" />
    <p><span class="font-bold">Brand: </span>${phone?.brand}</p>
    <p><span class="font-bold">Stroage: </span>${phone?.mainFeatures?.storage}</p>
    <p><span class="font-bold">Chip-Set: </span>${phone?.mainFeatures?.chipSet}</p>
    <p><span class="font-bold">Display-Size: </span>${phone?.mainFeatures?.displaySize}</p>
    <p><span class="font-bold">Memory: </span>${phone?.mainFeatures?.memory}</p>
    <p><span class="font-bold">Release Date: </span>${phone?.releaseDate}</p>
    `
    show_details_modal.showModal()
}
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll)
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner')
    // loadingSpinner.classList.remove('hidden')
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden')
    }
}

const handleShowAll = () => {
    handleSearch(true)
}

loadPhone()