export default (role) => {
    switch (role) {
        case "管理员":
            return "1"
        case "普通员工":
            return "0"
        default:
            break;
    }
}