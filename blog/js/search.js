// eslint-disable-next-line no-unused-vars
function searchFunc(path, searchId, contentId) {
  $.ajax({
    url: path,
    dataType: 'xml',
    success(xmlResponse) {
      // get the contents from search data
      // eslint-disable-next-line func-names
      const dataset = $('entry', xmlResponse)
        .map(function item() {
          return {
            title: $('title', this).text(),
            content: $('content', this).text(),
            url: $('url', this).text()
          };
        })
        .get();

      const $searchBox = $(`#${searchId}`);
      if (!($searchBox && $searchBox.length === 1)) {
        return;
      }
      const $resultContent = $(`#${contentId}`);
      if (!($resultContent && $resultContent.length === 1)) {
        return;
      }

      const $input = $searchBox.find('#search-input');
      const $searchBtn = $searchBox.find('.search-btn');
      const $resetBtn = $searchBox.find('.reset-search-btn');

      $searchBtn.on('click', () => {
        $searchBox.addClass('search-box-focus');
        $input[0].focus();
      });
      $resetBtn.on('click', () => {
        $('#content').css({
          display: 'flex'
        });
        $('.home').css({
          display: 'block'
        });
        $resultContent.css({
          display: 'none'
        });
        $input[0].focus();
      });
      $input.on('blur', e => {
        if ($(e.target).val() === '') {
          $searchBox.removeClass('search-box-focus');
        }
      });
      let flag = true;
      $input.on('compositionstart', () => {
        flag = false;
      });
      $input.on('compositionend', () => {
        flag = true;
      });
      $input.on('keydown', e => {
        if (e.keyCode === 13) {
          e.returnValue = false;
          e.preventDefault();
        }
      });
      $input.on('input', e => {
        const value = e.target.value.trim();
        setTimeout(() => {
          if (!flag) {
            return;
          }
          let str = '<ul class="search-result-list">';
          const keywords = value.toLowerCase().split(/\s+/);
          $resultContent[0].innerHTML = '';
          if (value.length <= 0) {
            $('#content').css({
              display: 'flex'
            });
            $('.home').css({
              display: 'block'
            });
            $resultContent.css({
              display: 'none'
            });
            return;
          }
          $('#content').css({
            display: 'none'
          });
          $('.home').css({
            display: 'none'
          });
          $resultContent.css({
            display: 'block'
          });

          let matchCount = 0;
          dataset.forEach(data => {
            let isMatch = true;
            if (!data.title || data.title.trim() === '') {
              return;
            }
            const dataTitle = data.title.trim().toLowerCase();
            const dataContent = data.content
              .trim()
              .replace(/<[^>]+>/g, '')
              .toLowerCase();
            const dataUrl = data.url;
            let indexTitle = -1;
            let indexContent = -1;
            let firstOccur = -1;
            // only match artiles with not empty contents
            if (dataContent !== '') {
              keywords.forEach((keyword, i) => {
                indexTitle = dataTitle.indexOf(keyword);
                indexContent = dataContent.indexOf(keyword);

                if (indexTitle < 0 && indexContent < 0) {
                  isMatch = false;
                } else {
                  if (indexContent < 0) {
                    indexContent = 0;
                  }
                  if (i === 0) {
                    firstOccur = indexContent;
                  }
                }
              });
            } else {
              isMatch = false;
            }
            if (isMatch) {
              matchCount += 1;
              str += `<li><h3><a target = "_blank" href="${dataUrl}" class="search-result-title">${dataTitle}</a></h3>`;
              const content = data.content.trim().replace(/<[^>]+>/g, '');
              if (firstOccur >= 0) {
                // cut out 100 characters
                let start = firstOccur - 20;
                let end = firstOccur + 80;

                if (start < 0) {
                  start = 0;
                }

                if (start === 0) {
                  end = 100;
                }

                if (end > content.length) {
                  end = content.length;
                }

                let matchContent = content.substr(start, end);

                // highlight all keywords
                keywords.forEach(keyword => {
                  const reg = new RegExp(keyword, 'gi');
                  matchContent = matchContent.replace(reg, str1 => `<em class="search-keyword">${str1}</em>`);
                });

                str += `<p class="search-result">${matchContent}...</p>`;
              }
              str += '</li>';
            }
          });
          $input.attr('results', matchCount);
          str += '</ul>';
          const title = matchCount
            ? `<h1>找到<em>${value}</em>相关内容${matchCount}个</h1>`
            : `<h1 class="empty-title">没有找到<em>${value}</em>相关内容</h1>`;
          str = title + str;
          $('#content').css({
            display: 'none'
          });
          $('.home').css({
            display: 'none'
          });

          $resultContent.css({
            display: 'block'
          });
          $resultContent[0].innerHTML = str;
        }, 0);
      });
    }
  });
}
