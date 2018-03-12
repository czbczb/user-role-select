var UserRoleSelect = (function (){
    var Default={
        show:false,//默认不显示
        className:"",//容器
        data:[{"value":1,"text":"站点管理员"},{"value":1,"text":"站点管理员"}],//需要展示的数据

    }
    /*用户可调用的方法
    onSave:function(){//保存需要的操作
        //用户自定义操作
        alert(111);
        //操作完成之后隐藏容器
        this.hide();
    },
    getValues:function(){//获取选中的值

    }
*/

    var html = 
    '<div class="user-role-container">'+
        '<ul class="left_list">'+
        '</ul>'+
        '<div class="oper_data">'+
            '<a href="#" class="add">添加</a>'+
            '<a href="#" class="del">删除</a>'+
        '</div>'+
        '<ul class="right_list">'+
            
        '</ul>'+
        '<div class="oper-bar">'+
            '<a href="#" class="save">保存</a>'+
            '<a href="#" class="close">关闭</a>'+
        '</div>'+
    '</div>';
    var UserRoleSelect = function (options){
        
        this.init(options||{});
        this.bind();//所有的事件绑定

        };
        UserRoleSelect.prototype = {
            init:function(options){
                for(var item in Default){
                    if(Default.hasOwnProperty("item")){
                        options.item =Default.item;
                    }
                }
                console.log(options);
                this.options = options;
                this.dom = document.createElement("div");
                this.dom.className = "user-role-select";
                this.dom.style.display = this.options.show?"block":"none";
                this.status = this.options.show?1:0;
                this.dom.innerHTML = html;
                document.body.appendChild(this.dom);
                this.save = this.dom.querySelector(".save");
                this.close = this.dom.querySelector(".close");
                this.left = this.dom.querySelector(".left_list");
                this.right = this.dom.querySelector(".right_list");
                this.add = this.dom.querySelector(".add");
                this.del = this.dom.querySelector(".del");
                var data = this.options.data||[];
                for(var i=0;i<data.length;i++){
                    this.left.innerHTML +=  "<li data-value='"+data[i].value+"'>"+data[i].text,data[i].value+"</li>";
                }
                this.items = this.left.querySelectorAll("li");
            },
            bind:function(){
                var _this = this;
                if(this.options.onSave){
                    this.save.onclick = _this.options.onSave.bind(_this);
                }
                this.close.onclick =function(e){
                    e.preventDefault();
                    _this.hide();
                }
               for(var i=0;i<this.items.length;i++){
                   this.items[i].onclick=this._itemClick;
               }
               this.del.onclick =  this.add.onclick =  this.operClick.bind(this,this.add);
               this.del.onclick =  this.add.onclick =  this.operClick.bind(this,this.del);
            },
            show:function(){
                this.dom.style.display = "block";
                this.status = 1;
            },
            hide:function(){
                this.dom.style.display = "none";
                this.status = 0;
            },
            _itemClick:function(){
                if(this.className.indexOf("selected") != -1){
                    this.className = "";
                }else{
                    this.className = "selected";
                }
            },
            operClick:function(target){
                var one;
                var two;
                if(target.className.indexOf("add") != -1){
                    one = this.left;
                    two = this.right;
                }else{
                    one = this.right;
                    two = this.left;
                }
                var selecteds = this.left.querySelectorAll(".selected");
                for(var i=0;i<selecteds.length;i++){
                    this.right.appendChild(selecteds[i]);
                }
            },
            getValues:function(){
                var values = "";
                var rightSeleteds = this.right.querySelectorAll("li");
                for(var i=0; i<rightSeleteds.length; i++){
                    values +=rightSeleteds[i].getAttribute("data-value");
                    if(i!=rightSeleteds.length-1){
                        values +=",";
                    }
                }
                return values;
            }
        }


    return UserRoleSelect;
})()
 