
let subjectChange = newSubject => {
  if (newSubject) socket.emit("adminSubjectChange", newSubject)
  else socket.emit("adminSubjectChange")
}
socket.on("adminSubjectChange", newSubject => {
  if (Array.isArray(newSubject)) {
    let logSubjects = []
    newSubject.forEach(sub => logSubjects.push(sub.name))
  }
  else {
    [...wordsTable.children].forEach((child, i) => child.textContent = newSubject.data[i])
    subjectTitle.textContent = newSubject.name
  }
})