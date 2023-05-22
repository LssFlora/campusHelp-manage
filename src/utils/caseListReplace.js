export default (caseList) => {
    let newList = caseList || []
    let result = []
    newList.forEach(caseItem => {
        console.log("caseItem", caseItem);
        let role = caseItem.authority.indexOf("4") != -1 ? "管理员" : caseItem.authority.indexOf("1") != -1 ? "登记员" : caseItem.authority.indexOf("2") != -1 ? "评估员" : "报销员"
        caseItem = { ...caseItem, authority: role }
        caseItem = { ...caseItem, createtime: caseItem.createtime.split("T")[0] }
        caseItem = { ...caseItem, key: caseItem.id }
        console.log("step caseItem", caseItem);
        result = [...result, caseItem]
    });
    return result
}