export default (role) => {
    switch (role) {
        case "管理员":
            return "1,2,3,4"
        case "登记员":
            return "1"
        case "评估员":
            return "2"
        case "报销员":
            return "3"
        default:
            break;
    }
}