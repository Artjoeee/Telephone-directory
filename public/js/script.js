window.onload = () => {
    const inputName = document.querySelector('input[name="name"]');
    const inputPhone = document.querySelector('input[name="phone"]');
    const delBtn = document.getElementById("deleteBtn");

    if (!inputName || !delBtn) return;

    const toggleDelete = () => {
        if (inputName.value || inputPhone.value) {
            delBtn.disabled = true;
        } else {
            delBtn.disabled = false;
        }
    };

    inputName.addEventListener("input", toggleDelete);
    inputPhone.addEventListener("input", toggleDelete);
}