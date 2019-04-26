/**
 * created in 2019-4-23
 * author:liguixing<www.liguixing.com>
 * description:导出 table 数据到 excel
 */
function ExportTableToExcel(){
  this.options = {
    exclude: "no-need-export-row",
    name: "Worksheet",
    fileName: "table2excel"
  };
  this.template = {
    head: "<html xmlns:o=\"urn:schemas-microsoft-com:office:office\" xmlns:x=\"urn:schemas-microsoft-com:office:excel\" xmlns=\"http://www.w3.org/TR/REC-html40\"><head><meta charset=\"UTF-8\"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>",
    sheet: {
      head: "<x:ExcelWorksheet><x:Name>",
      tail: "</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>"
    },
    mid: "</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>",
    table: {
      head: "<table>",
      tail: "</table>"
    },
    foot: "</body></html>"
  };
  this.uri = "data:application/vnd.ms-excel;base64,";
}

ExportTableToExcel.prototype.base64 = function(s) {
  return window.btoa(unescape(encodeURIComponent(s)));
};
ExportTableToExcel.prototype.format = function(s, c) {
  return s.replace(/{(\w+)}/g,function(m, p) {
      return c[p];
  });
};
ExportTableToExcel.prototype.getFileName = function(settings) {
  if(settings.fileName.lastIndexOf('.xlsx') > 0 || settings.fileName.lastIndexOf('.xls') > 0 ){//不能等于0  ".xlsx"
    return settings.fileName;
  }else{
    return settings.fileName + ".xlsx";
  }
}
//去掉img标签
ExportTableToExcel.prototype.excludeImg = function(string) {
  return string.replace(/<img[^>]*>/gi, "");
}
//去掉a标签
ExportTableToExcel.prototype.excludeLink = function(string) {
  return string.replace(/<a[^>]*>|<\/a>/gi, "");
}
//去掉输入框标签
ExportTableToExcel.prototype.excludeInput = function(string) {
  var _patt = /(\s+value\s*=\s*"([^"]*)"|\s+value\s*=\s*'([^']*)')/i;
  return string.replace(/<input[^>]*>|<\/input>/gi, function myFunction(x){
    var res = _patt.exec(x);
    if (res !== null && res.length >=2) {
      return res[2];
    } else {
      return "";
    }
  })
  .replace(/<textarea[^>]*>|<\/textarea>/gi, "");
}

ExportTableToExcel.prototype.hasClass = function(el, className){
  var obj_class = " "+el.className+" ";
  return obj_class.indexOf(" "+className+" ")>=0;
}
ExportTableToExcel.prototype.exportExcel = function(el,exportOptions){
  var tableRows = [];
  var tempRows = '';
  var opt = this.options;
  var options = exportOptions;
  for(var key in opt){
    if(!options[key]){
      options[key] = opt[key];
    }
  }
  //去掉样式类前面的"."
  options.exclude = options.exclude.replace(/\./,"");
  var trs = el.getElementsByTagName('tr');
  for(var i = 0; i < trs.length; i++){
    if(!this.hasClass(trs[i],options.exclude)){
      tempRows += "<tr>" + trs[i].innerHTML + "</tr>";
      //tempRows += trs[i].outerHTML;
    }
  };
  tableRows.push(tempRows);
  if (options.excludeImg) {
    tableRows[0] = this.excludeImg(tableRows[0]);
  }
  if (options.excludeLink) {
    tableRows[0] = this.excludeLink(tableRows[0]);
  }
  if (options.excludeInput) {
    tableRows[0] = this.excludeInput(tableRows[0]);
  }
  this.downloadExcel(tableRows,options);
}

ExportTableToExcel.prototype.downloadExcel = function(table, options) {
  var e = this, fullTemplate = "",
  i, link, a;
  var ctx = {
    worksheet: options.name,
    table: table
  };
  fullTemplate = e.template.head;
  // 创建工作簿名字
  if (Array.isArray(table)) {
    for (i in table) {
      fullTemplate += e.template.sheet.head + "Table" + i + "" + e.template.sheet.tail;
    }
  }
  fullTemplate += e.template.mid;
  if (Array.isArray(table)) {
    for (i in table) {
      fullTemplate += e.template.table.head + "{table" + i + "}" + e.template.table.tail;
    }
  }
  fullTemplate += e.template.foot;
  for (i in table) {
    ctx["table" + i] = table[i];
  }
  delete ctx.table;
  var saveFileName = e.getFileName(options);
  function _isBrowser (browser) {
    var ua = navigator.userAgent;
    if (browser === 'ie') {
      var isIE = ua.indexOf('compatible') > -1 && ua.indexOf('MSIE') > -1;
      if (isIE) {
        var reIE = new RegExp('MSIE (\\d+\\.\\d+);');
        reIE.test(ua);
        return parseFloat(RegExp['$1']);
      } else {
        return false;
      }
    } else {
      return ua.indexOf(browser) > -1;
    }
  };
  function _isIE11 () {
    var iev = 0;
    var ieold = (/MSIE (\d+\.\d+);/.test(navigator.userAgent));
    var trident = !!navigator.userAgent.match(/Trident\/7.0/);
    var rv = navigator.userAgent.indexOf('rv:11.0');
    if (ieold) {
      iev = Number(RegExp.$1);
    }
    if (navigator.appVersion.indexOf('MSIE 10') !== -1) {
      iev = 10;
    }
    if (trident && rv !== -1) {
      iev = 11;
    }
    return iev === 11;
  };
  function _isEdge () {
      return /Edge/.test(navigator.userAgent);
  };
  if (_isBrowser('ie') && _isBrowser('ie') < 10) {
    var oWin = window.top.open('about:blank', '_blank');
    oWin.document.charset = 'utf-8';
    oWin.document.write(e.format(fullTemplate, ctx));
    oWin.document.close();
    oWin.document.execCommand('SaveAs', saveFileName);
    oWin.close();
  } else if (_isBrowser('ie') === 10 || _isIE11() || _isEdge()) {
    fullTemplate = e.format(fullTemplate,ctx);
    fullTemplate = [fullTemplate];
    var blob1 = new Blob(fullTemplate, { type: "text/html" });
    window.navigator.msSaveBlob(blob1, saveFileName);
  } else {
    link = e.uri + e.base64(e.format(fullTemplate, ctx));
    a = document.createElement("a");
    a.download = saveFileName;
    a.href = link;
    a.click();
  }
  return true;
}

var exportTableToExcel = new ExportTableToExcel();
export default exportTableToExcel;

/*
excel模板如下
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
  <head>
    <meta charset="UTF-8">
    <!--[if gte mso 9]>
    <xml>
      <x:ExcelWorkbook>
        <x:ExcelWorksheets>
        
          <x:ExcelWorksheet>
            <x:Name>Table0</x:Name>
            <x:WorksheetOptions>
              <x:DisplayGridlines/>
            </x:WorksheetOptions>
          </x:ExcelWorksheet>

          <x:ExcelWorksheet>
            <x:Name>Table1</x:Name>
            <x:WorksheetOptions>
              <x:DisplayGridlines/>
            </x:WorksheetOptions>
          </x:ExcelWorksheet>

        </x:ExcelWorksheets>
      </x:ExcelWorkbook>
    </xml>
    <![endif]-->
  </head>
  <body>
    <table>{table0}</table>
    <table>{table1}</table>
  </body>
</html>
*/