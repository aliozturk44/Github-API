//Elementleri seçme

const githubForm = document.getElementById("github-form"); //form
const nameInput = document.getElementById("githubname");  // input
const clearLastUsers = document.getElementById("clear-last-users"); // tamamını temizle
const lastUsers = document.getElementById("last-users");  // eklenen öğeler

const github = new Github();

const ui = new UI();

eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData)
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);
    
}

function getData(e){

    const username = nameInput.value.trim();

    if(username === ""){
        alert("Lütfen geçerli bir kullanıcı adı giriniz..")
    }
    else{
        github.getGithubData(username)
        .then(response => {
            if(response.user.message === "Not Found"){
                //Hata
                ui.showError("Kullanıcı bulunamadı..")
            }
            else{
                ui.addSearchedUserToUI(username);

                Storage.addSearchedUserToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }
        })
        .catch(err => ui.showError(err));
    }
    ui.clearInput();
    e.preventDefault();
}

function clearAllSearched(){
    // Tüm yazılanları temizle

    if(confirm("Emin misiniz?")){
        Storage.clearAllSearchedUsersFromStorage();
        ui.clearAllSearchedFromUI();
    }

}

function getAllSearched(){
    // Arananları storagetan al ve Uİ a ekle

    let users = Storage.getSearchedUsersFromStorage();
    let result = "";

    users.forEach(user => {
        // <li class="list-group-item">asdaskdjkasjkşdjşasjd</li>
        result += `<li class="list-group-item">${user}</li>`;

    })

    lastUsers.innerHTML = result;

}