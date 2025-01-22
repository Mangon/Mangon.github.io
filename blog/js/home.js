$(document).ready(() => {
  const poetry = [
    `念奴娇·赤壁怀古
  苏轼
  大江东去，浪淘尽，千古风流人物。
  故垒西边，人道是，三国周郎赤壁。
  乱石穿空，惊涛拍岸，卷起千堆雪。
  江山如画，一时多少豪杰。

  遥想公瑾当年，小乔初嫁了，雄姿英发。
  羽扇纶巾，谈笑间，樯橹灰飞烟灭。
  故国神游，多情应笑我，早生华发。
  人生如梦，一尊还酹江月。`,
    `青玉案·元夕
  辛弃疾
  东风夜放花千树。更吹落、星如雨。
  宝马雕车香满路。凤箫声动，玉壶光转，一夜鱼龙舞。

  蛾儿雪柳黄金缕。笑语盈盈暗香去。
  众里寻他千百度。蓦然回首，那人却在，灯火阑珊处。`,
    `一剪梅
  李清照
  红藕香残玉簟秋。轻解罗裳，独上兰舟。
  云中谁寄锦书来？雁字回时，月满西楼。

  花自飘零水自流。一种相思，两处闲愁。
  此情无计可消除，才下眉头，却上心头。`,
    `虞美人
  李煜
  春花秋月何时了，往事知多少？
  小楼昨夜又东风，故国不堪回首月明中。

  雕阑玉砌应犹在，只是朱颜改。
  问君能有几多愁？恰似一江春水向东流。`,
    `雨霖铃
  柳永
  寒蝉凄切，对长亭晚，骤雨初歇。
  都门帐饮无绪，留恋处，兰舟催发。
  执手相看泪眼，竟无语凝噎。
  念去去，千里烟波，暮霭沉沉楚天阔。
  多情自古伤离别，更那堪，冷落清秋节！
  今宵酒醒何处？杨柳岸，晓风残月。
  此去经年，应是良辰好景虚设。
  便纵有千种风情，更与何人说？`,
    `蝶恋花
  欧阳修
  庭院深深深几许，杨柳堆烟，帘幕无重数。
  玉勒雕鞍游冶处，楼高不见章台路。

  雨横风狂三月暮，门掩黄昏，无计留春住。
  泪眼问花花不语，乱红飞过秋千去。`,
    `水调歌头
  苏轼
  明月几时有？把酒问青天。
  不知天上宫阙，今夕是何年。
  我欲乘风归去，又恐琼楼玉宇，高处不胜寒。
  起舞弄清影，何似在人间。

  转朱阁，低绮户，照无眠。
  不应有恨，何事长向别时圆？
  人有悲欢离合，月有阴晴圆缺，此事古难全。
  但愿人长久，千里共婵娟。`,
    `卜算子·咏梅
  陆游
  驿外断桥边，寂寞开无主。
  已是黄昏独自愁，更着风和雨。

  无意苦争春，一任群芳妒。
  零落成泥碾作尘，只有香如故。`,
    `鹊桥仙
  秦观
  纤云弄巧，飞星传恨，银汉迢迢暗度。
  金风玉露一相逢，便胜却人间无数。
  柔情似水，佳期如梦，忍顾鹊桥归路。
  两情若是久长时，又岂在朝朝暮暮。`,
    `江城子
  苏轼
  十年生死两茫茫，不思量，自难忘。
  千里孤坟，无处话凄凉。
  纵使相逢应不识，尘满面，鬓如霜。

  夜来幽梦忽还乡，小轩窗，正梳妆。
  相顾无言，惟有泪千行。
  料得年年肠断处，明月夜，短松冈。`
  ];

  const poemElements = poetry.map(poem => {
    const lines = poem.split('\n');
    const [title, author] = lines;
    let content = '';
    for (let i = 2; i < lines.length; i += 1) {
      content += `<p>${lines[i]
        .replace(/ /g, '')
        .replace(/(，|\n|、)/g, '<br>')
        .replace(/(。|？|！)/g, '</p><p>')}</p>`;
    }
    return `<h1>${title}</h1>
    <p class="author">${author}</p>
    ${content}
    `;
  });

  $('.original').html(poemElements[Math.floor(Math.random() * poemElements.length)]);

  const content = $('.original').html();
  const top = $('<div/>').insertBefore('.original');
  const bottom = $('<div/>').insertBefore('.original');

  for (let i = 0; i < 2; i += 1) {
    $('<div/>').addClass('realistic blur blur-top').html(content).appendTo(top);
    $('<div/>').addClass('realistic blur blur-bottom').html(content).appendTo(bottom);
  }

  const home = $('.home')[0];
  if (home) {
    const footer = $('.footer', home.parentNode.parentNode);
    footer.addClass('hide');
  }
});
