export function showModal(modal) {
    document.getElementById(modal).style.display = "block";
    document.getElementById(modal).style.zIndex = 2;
    document.getElementById('blocker').classList.add('blockerActive');
    if (modal === 'deleteAccountModal') {
        document.getElementById('userInfoModal').style.display = "none";
        document.getElementById('deleteBlocker').style.zIndex = 3;
        document.getElementById('deleteAccountModal').style.zIndex = 4;
        document.getElementById('deleteBlocker').classList.add('blockerActive');
    }

}

export function hideModal(modal, nestedModal = false) {
    if (nestedModal === false) {
        document.getElementById('blocker').classList.remove('blockerActive');
        document.getElementById('deleteBlocker').classList.remove('blockerActive');
    }
    if (modal === 'deleteAccountModal') {
        document.getElementById('userInfoModal').style.display = 'block';
        document.getElementById('deleteBlocker').classList.remove('blockerActive');
    }
    document.getElementById(modal).style.display = "none";
}

export function hideOtherNestModals(modal) {
    const allNestedModals = ['monthPicker', 'dayPicker', 'startHourPicker', 'startMinutePicker', 'endHourPicker', 'endMinutePicker'];
    const nestModalsToHide = allNestedModals.filter(item => item !== modal);
    for (let i = 0; i < nestModalsToHide.length; i++) {
        document.getElementById(nestModalsToHide[i]).style.display = 'none';
    }
}