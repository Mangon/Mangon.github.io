function searchFunc(path, searchId, contentId) {
    $.ajax({
        url: path,
        dataType: 'xml',
        success: function (xmlResponse) {
            // get the contents from search data
            var datas = $('entry', xmlResponse).map(function () {
                return {
                    title: $('title', this).text(),
                    content: $('content', this).text(),
                    url: $('url', this).text()
                };
            }).get();

            var $searchBox = $('#' + searchId);
            if (!($searchBox && $searchBox.length == 1)) {
                return;
            }
            var $resultContent = $('#' + contentId);
            if (!($resultContent && $resultContent.length == 1 )) {
                return;
            }

            var $input = $searchBox.find('#search-input');
            var $searchBtn = $searchBox.find('.search-btn');
            var $resetBtn = $searchBox.find('.reset-search-btn');

            $searchBtn.on('click', function (e) {
                $searchBox.addClass('search-box-focus');
                $input[0].focus();
            });
            $resetBtn.on('click', function (e) {
                $('#content').css({
                    display: 'block'
                });
                $resultContent.css({
                    display: 'none'
                });
                $input[0].focus();
            });
            $input.on('blur', function () {
                ($(this).val() === '') && $searchBox.removeClass('search-box-focus');
            });
            var flag = true;
            $input.on('compositionstart', function () {
                flag = false;
            });
            $input.on('compositionend', function () {
                flag = true;
            });
            $input.on('keydown', function (e) {
                var e = e || event;
                if (e.keyCode === 13) {
                    e.returnValue = false;
                    e.preventDefault();
                }
            })
            $input.on('input', function () {
                var $this = this;
                setTimeout(function () {
                    if (!flag) {
                        return;
                    }
                    var str = '<ul class="search-result-list">';
                    var keywords = $this.value.trim().toLowerCase().split(/\s+/);
                    $resultContent[0].innerHTML = '';
                    if ($this.value.trim().length <= 0) {
                        $('#content').css({
                            display: 'block'
                        });
                        $resultContent.css({
                            display: 'none'
                        });
                        return;
                    } else {
                        $('#content').css({
                            display: 'none'
                        });
                        $resultContent.css({
                            display: 'block'
                        });
                    }
                    var matchCount = 0;
                    datas.forEach(function (data) {
                        var isMatch = true;
                        if (!data.title || data.title.trim() === '') {
                            return false;
                        }
                        var data_title = data.title.trim().toLowerCase();
                        var data_content = data.content.trim().replace(/<[^>]+>/g, "").toLowerCase();
                        var data_url = data.url;
                        var index_title = -1;
                        var index_content = -1;
                        var first_occur = -1;
                        // only match artiles with not empty contents
                        if (data_content !== '') {
                            keywords.forEach(function (keyword, i) {
                                index_title = data_title.indexOf(keyword);
                                index_content = data_content.indexOf(keyword);

                                if (index_title < 0 && index_content < 0) {
                                    isMatch = false;
                                } else {
                                    if (index_content < 0) {
                                        index_content = 0;
                                    }
                                    if (i === 0) {
                                        first_occur = index_content;
                                    }
                                }
                            });
                        } else {
                            isMatch = false;
                        }
                        if (isMatch) {
                            matchCount++;
                            str += '<li><h3><a target = "_blank" href="' + data_url + '" class="search-result-title">' + data_title + '</a></h3>';
                            var content = data.content.trim().replace(/<[^>]+>/g, '');
                            if (first_occur >= 0) {
                                // cut out 100 characters
                                var start = first_occur - 20;
                                var end = first_occur + 80;

                                if (start < 0) {
                                    start = 0;
                                }

                                if (start === 0) {
                                    end = 100;
                                }

                                if (end > content.length) {
                                    end = content.length;
                                }

                                var match_content = content.substr(start, end);

                                // highlight all keywords
                                keywords.forEach(function (keyword) {
                                    var reg = new RegExp(keyword, 'gi');
                                    match_content = match_content.replace(reg, function (str) {
                                        return '<em class="search-keyword">' + str + '</em>';
                                    })
                                });

                                str += '<p class="search-result">' + match_content + '...</p>';
                            }
                            str += '</li>';
                        }
                    });
                    $input.attr('results', matchCount);
                    str += '</ul>';
                    var title = matchCount ? '<h1>找到<em>' + $this.value.trim() + '</em>相关内容' + matchCount + '个</h1>' : '<h1 class="empty-title">没有找到<em>' + $this.value.trim() + '</em>相关内容</h1>';
                    str = title + str;
                    $('#content').css({
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
};
