(function () {
  const fs = require('fs')
  const path = require('path')
  const less = require('less')

  const encoding = "utf-8"

  const styles = document.querySelectorAll('link[rel="import"][type="less"]')

  Array.prototype.forEach.call(styles, function (style) {
    // load the less text
    const lessText = style.import.querySelector("body").firstChild.textContent

    less.render(lessText, (error, output) => {
      if (error) {
        console.log(error)
        return
      }

      const cssText = output.css
      let link = document.createElement('style')
      link.innerHTML = cssText
      document.head.appendChild(link)
    })
  })
})()
