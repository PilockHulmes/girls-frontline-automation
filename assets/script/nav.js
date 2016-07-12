(function () {
  const links = document.querySelectorAll('link[rel="import"][type="template"]')

  Array.prototype.forEach.call(links, function (link) {
    let template = link.import.querySelector('.template')
    let clone = document.importNode(template.content, true)
    if (link.href.match('about.html')) {
      document.querySelector('body').appendChild(clone)
    } else {
      document.querySelector('.content').appendChild(clone)
    }
  })
})()
