/*
 * 树工具 ( 代码参考 MzTreeView 1.0 版本改写, css 参考 CNL Tree Menu Ver 1.02 版本改写 )
 * version : "1.0",
 * auther : "陈 庭",
 *
 * Date: 2011-08-18
 *
 */
function yxTree(Tname) {
	if(typeof(Tname) != "string" || Tname == ""){
		throw(new Error('创建类实例的时候请把类实例的引用变量名传递进来！'));
	}
	
	//【property】
	this.url      = "javascript:";
	this.target   = "_self";
	this.name     = Tname;		// 树实例名字
	this.wordLine = false;
	this.currentNode = null;
	this.useArrow = true;		// 是否使用方向键控制跳转到上级下级父级子级节点
	this.nodes = {};			// 使用 -1_1 格式的结点信息保存 (String)
	this.node  = {};			// 使用 1 格式保存的结点信息 (JSON)
	this.names = "";			// 整个树的 sourceIndex 相连的名字
	this._d    = "\x0f";
	this.index = 0;
	this.divider   = "_";		// ID 连接线
	this.rootId = "-1";			// 根 ID
	this.skinName = 'skin3';		// 是否自动添加皮肤文件
	
	// 样式
	this.classOpened = "Opened";
	this.classClosed = "Closed";
	this.classChild = "Child";
	this.classFocus = "focusNode";
	
	// 外部函数
	this.htmlHander = null;
	this.treeinitHander = null;
  
	//yxTree 初始化入口函数
	this.toString = function(id) {
		if(this.skinName != null && this.skinName != ''){	// 是否需要添加皮肤
			if($('#yxTreeCss').length == 0){ // 检查是否已经添加了样式
				this.linkTreeCss(this.skinName);
			}
		}
		
		this.dataFormat();
		
		this.node["0"] = { // 初始结点
			"id": "0",
			"path": this.rootId,
			"isLoad": false,
			"hasChild" : true,
			"childNodes": [],
			"childAppend": "",
			"sourceIndex": this.rootId,
			"sourceId": this.rootId
		};
		this.nodeInit("0"); // 初始化生成树结点数组结构
		var str = '';
		if(this.htmlHander != null){ 	// 若有外部方法则使用外部生成 HTML
			str = this.htmlHander(this.node, this.name, "0", 1); // 结点集合， 树名称， 初始ID, 树深度
		}else{
			str = this.generateTreeHtml("0"); // 生成 html
		}
		
		str = '<div class="yxTree" id="yxTree_' + this.name + '">' + str + '</div>';

		$('#' + id).html(str);
		
		if(this.treeinitHander != null){ // 若有外部方法则使用外部初始化方法
			this.treeinitHander(this.name, this);
		}else{
			tree.treeInit(); 	// 添加样式及事件
		}
		
		return;
	};

	//生成数组
	this.toArr = function(id) {
		this.dataFormat();
		
		this.node["0"] = { // 初始结点
			"id": "0",
			"path": this.rootId,
			"isLoad": false,
			"hasChild" : true,
			"childNodes": [],
			"childAppend": "",
			"sourceIndex": this.rootId,
			"sourceId": this.rootId
		};
		this.nodeInit("0"); // 初始化生成树结点数组结构

		return this.node;
	};

	//生成json ;
	this.toJson = function(id) {
		var json = this.toArr()[0].childNodes

		return json;
	};
}

// 把所有的 nodes 结点信息，生成一个树型的数组结构
//在数据源检索所需的数据节点
//id  客户端节点对应的id
yxTree.prototype.nodeInit = function(id){
	var node = this.node[id], d = this.divider, _d = this._d;
	var sid = node.sourceIndex.substr(node.sourceIndex.indexOf(d) + d.length); // 取得实际的 sourceId
	var reg = new RegExp("(^|"+_d+")"+ sid +d+"[^"+_d+d +"]+("+_d+"|$)", "g");
	var cns = this.names.match(reg), tcn = this.node[id].childNodes; 
	if (cns){
		reg = new RegExp(_d, "g"); 
		for (var i=0; i<cns.length; i++) {
			//初始化节点信息, 根据 this.nodes 数据源生成节点的详细信息
			//sourceIndex 数据源中的父子节点组合的字符串 0_1
			//parentId    当前树节点在客户端的父节点的 id
			var sourceIndex = cns[i].replace(reg, "");
			var parentId = id;
			this.index++;
			var source= this.nodes[sourceIndex];
			var text  = this.getAttribute(source, "text");
			var hint  = this.getAttribute(source, "hint");
			var url  = this.getAttribute(source, "url");
			var target  = this.getAttribute(source, "target");
			var method  = this.getAttribute(source, "method");
			var attr1  = this.getAttribute(source, "attr1");
			var attr2  = this.getAttribute(source, "attr2");
			var attr3  = this.getAttribute(source, "attr3");
			var attr4  = this.getAttribute(source, "attr4");
			var attr5  = this.getAttribute(source, "attr5");
			var csid   = sourceIndex.substr(sourceIndex.indexOf(d) + d.length);
		
			this.node[this.index] = {
				"id"    : this.index,			// id
				"text"  : text,					// 标题
				"hint"  : hint ? hint : text,	// 标题提示
				"icon"  : this.getAttribute(source, "icon"),	// icon
				"path"  : this.node[parentId].path + d + this.index,	// 结点路径
				"isLoad": false,			 	// 是否已经加载
				"isExpand": false,				// 是否已经展开
				"parentId": parentId,			// 父结点ID
				"parentNode": this.node[parentId],	// 父结点
				"sourceIndex" : sourceIndex,		// 原来的索引, 如 -1_1
				"sourceId" : csid,					// 原来的ID,  如上则是 id=1
				"childAppend" : "",
				"url" : url,					// 结点点击url
				"target" : target,				// 
				"method" : method,				// 结点点击方法，只有当url 为空时才生效
				"attr1" : attr1,
				"attr2" : attr2,
				"attr3" : attr3,
				"attr4" : attr4,
				"attr5" : attr5
			};
			this.nodes[sourceIndex] = "index:"+ this.index +";"+ source;
			this.node[this.index].hasChild = this.names.indexOf(this._d + csid + d)>-1;	// 判断是否有子结点
			
			tcn[tcn.length] = this.node[this.index];  // 把初始化后的结点放入到 id 的node结点的子结点下面， 必须在下面的子结点加载方法前执行
			
			if(this.node[this.index].hasChild) {
				this.node[this.index].childNodes = [];
				this.nodeInit(this.index);      // 递归读取子结点
			}
		}
	}
	node.isLoad = true;
};

// 生成树的 html 代码
yxTree.prototype.generateTreeHtml = function(id){
	var s = '<ul>';
	var nodes = this.node[id].childNodes;
	for(var i = 0; i < nodes.length; i++){
		s += '<li id="yxTree_' + this.name + '_li_' + nodes[i].id + '" class="' + (nodes[i].hasChild?"":"Child") + '" nodeId="' + nodes[i].id + '"><span class="s">&nbsp;<span class="icon"></span></span>';
		if(nodes[i].url == '' && nodes[i].method != ''){ // js 方法
			s += '<a href="javascript:' + (nodes[i].method?nodes[i].method:'') + '(' + this.name + '.getNode(' + nodes[i].id + '))" target="_self" title="' + nodes[i].hint + '">';
		}else{ // url
			s += '<a href="' + (nodes[i].url?nodes[i].url:this.url) + '" target="' + (nodes[i].target?nodes[i].target:this.target) + '"  title="' + nodes[i].hint + '">';
		}
		s += nodes[i].text + '</a>';
		if(nodes[i].hasChild){
			s += this.generateTreeHtml(nodes[i].id);
		}
		s += '</li>';
	}
	s += '</ul>';
	return s;
};


// 根据树的html, 再添加上相应的 class （CSS) 和事件
yxTree.prototype.treeInit = function(){
	var treeObj = this;

	$('#yxTree_' + this.name + '.yxTree li').each(function(){
		var c = $(this).attr('class');
		if(typeof(c) == 'undefined' || c == null || c == ''){ // 把没有设置 class 内容的全部设置为关闭(closed)
			$(this).addClass(treeObj.classClosed);
		}
	});
	
	// 增加点击事件，展开/折叠
	$('#yxTree_' + this.name + '.yxTree span.s').click(function(){
		treeObj.toggleExpand($(this).parent().attr('nodeId'));
	});

	$('#yxTree_' + this.name + '.yxTree a').click(function(){
		treeObj.focusNodeText($(this).parent().attr('nodeId'));
	});
};

// 聚集到某个结点
yxTree.prototype.focusNode = function(id) {
	// 把所有父结点都展开
	var node = this.node[id];
	var pNode = node.parentNode;
	var path = node.path.split(this.divider);
	for(var i = 2; i < path.length; i++){
		this.expand(pNode.id);
		pNode = pNode.parentNode;
	}
	
	// 设置当前选中结点
	this.currentNode = this.node[id];
	
	// 触发a点击事件
	$('#yxTree_' + this.name + '_li_' + id).children('a').click();
};

// 聚集到某个结点的文本
yxTree.prototype.focusNodeText = function(id) {
	$('#yxTree_' + this.name + '.yxTree a').removeClass(this.classFocus);
	$('#yxTree_' + this.name + '_li_' + id).children('a').addClass(this.classFocus);
};

// 展开或关闭某个结点
yxTree.prototype.toggleExpand = function(id) {
	if($('#yxTree_' + this.name + '_li_' + id).hasClass(this.classOpened)){
		$('#yxTree_' + this.name + '_li_' + id).removeClass(this.classOpened);
		$('#yxTree_' + this.name + '_li_' + id).addClass(this.classClosed);
	}else{
		$('#yxTree_' + this.name + '_li_' + id).removeClass(this.classClosed);
		$('#yxTree_' + this.name + '_li_' + id).addClass(this.classOpened);
	}
};
yxTree.prototype.expand = function(id){
	$('#yxTree_' + this.name + '_li_' + id).removeClass(this.classClosed);
	$('#yxTree_' + this.name + '_li_' + id).addClass(this.classOpened);
}
yxTree.prototype.closed = function(id){
	$('#yxTree_' + this.name + '_li_' + id).removeClass(this.classOpened);
	$('#yxTree_' + this.name + '_li_' + id).addClass(this.classClosed);
}

// 展开所有结点
yxTree.prototype.expandAll = function(){
	var classNameChild = this.classChild;
	var classNameOpen = this.classOpened;
	var classNameClose = this.classClosed;
	$('#yxTree_' + this.name + '.yxTree li').each(function(){
		if(!$(this).hasClass(classNameChild)){
			$(this).removeClass(classNameClose);
			$(this).addClass(classNameOpen);
		}
	});
};

// 关闭所有结点
yxTree.prototype.closeAll = function(){
	var classNameChild = this.classChild;
	var classClosed = this.classClosed;
	var classNameOpen = this.classOpened;
	$('#yxTree_' + this.name + '.yxTree li').each(function(){
		if(!$(this).hasClass(classNameChild)){
			$(this).removeClass(classNameOpen);
			$(this).addClass(classClosed);
		}
	});
};

// 在页面中加入 css 文件
yxTree.prototype.linkTreeCss = function(skin){
	skin = skin?skin:'skin3';
	
	$('#yxTreeCss').remove(); // 把旧样式去掉
	// 动态加入皮肤样式(CSS)
	$("script").each(function () { 
		if(this.src.toString().match(/yx\.yxTree.*?js$/)) { 
			// 创建样式表
			$("head").append("<link rel=\"stylesheet\" type=\"text/css\" href=\"" + this.src.toString().replace(/yx\.yxTree.*?js$/, "") + "skin/"+ skin +"/yxTree.css" + "\" id=\"yxTreeCss\" />");
		}
	});
}

//从XML格式字符串里提取信息
//source 数据源里的节点信息字符串(以后可以扩展对XML的支持)
//name   要提取的属性名
yxTree.prototype.getAttribute = function(source, name){
	var reg = new RegExp("(^|;|\\s)"+ name +"\\s*:\\s*([^;]*)(\\s|;|$)", "i"); 
	if (reg.test(source)){
		return RegExp.$2.replace(/[\x0f]/g, ";").replace(/\'/g, "&#39;"); 
	}else{
		return "";
	}
};

//为配合系统初始聚集某节点而写的函数, 得到某节点在数据源里的路径
//sourceId 数据源里的节点 id
yxTree.prototype.getPath= function(sourceId) {
	Array.prototype.indexOf = function(item) {
		for(var i=0; i<this.length; i++) {
			if(this[i]==item) return i;
		}
		return -1;
	};
	var _d = this._d, d = this.divider;
	var A = new Array(), id=sourceId; A[0] = id;
	while(id!="0" && id!="") {
		var str = "(^|"+_d+")([^"+_d+d+"]+"+d+ id +")("+_d+"|$)";
		if (new RegExp(str).test(this.names)) {
			id = RegExp.$2.substring(0, RegExp.$2.indexOf(d));
			if(A.indexOf(id)>-1) break;
			A[A.length] = id;
		} else break;
	}
	return A.reverse();
};

// 根据原来的 sourceId 取得node的实际 id(index)
yxTree.prototype.getRealId= function(sourceId) {
	var node = this.getNodeBySid(sourceId);
	return node.id;
}

// 根据原来的 sourceId 取得node
yxTree.prototype.getNodeBySid= function(sourceId) {
	var path = this.getPath(sourceId);
	var root = this.node["0"], len = path.length;
	for(var i=1; i<len; i++) {
		if(root.hasChild) {
			for (var k=0; k < root.childNodes.length; k++) {
				if (root.childNodes[k].sourceId == path[i]) {
					root = root.childNodes[k];
					break;
				}
			}
		}
	}
	return root;
};

// 根据ID取得结点
yxTree.prototype.getNode = function(id){
	return this.node[id];
};

//初始化数据源里的数据以便后面的快速检索
yxTree.prototype.dataFormat = function() {
	var a = new Array();
	for (var id in this.nodes) {
		a[a.length] = id;
	}
	this.names = a.join(this._d + this._d);
	
	this.totalNode = a.length; 
	a = null;
};

