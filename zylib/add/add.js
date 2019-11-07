var _info;
Do('tpl', function () {
	Do('splitUrl', function () {
		var info = wwkj.split(location.href);
		console.log(info);
		_info = info;
		var key = info.key;
		var page = 1;
		if (key == 'yuangong' || key == 'bumen') {
			Config.baseUrl = XUNDIAN_DEVELOPURL;
		}

		var arg = $.extend({}, globalArg, {
			'psize': Config.pageSize,
			'page': page,

		});


		var gettpl;
		gettpl = document.getElementById('j_tpl_' + key).innerHTML;
		var data = {};
		laytpl(gettpl).render(data, function (html) {
			$('#j_data').html(html);
			required(0);
			getSelect();
			initDatePicker();
			if (key == 'zichanleixing') {
				if (info.orgName != '全部') {
					$('[name=levelNo]').removeAttr('title').attr('disabled', false).html('<option value="' + info.org + '">' + info.orgName + '</option>');
					Do('bootstrapSelect', function () {
						$('select').attr('title', '请选择');
						$('[name=levelNo]').selectpicker('refresh');
					})

				}


				Do('switch', function () {
					wwkjSwitch.init();
					switchEvent("#switch", function () {
						console.log("开");
						$('#switch').siblings('input').val('Y');


					}, function () {
						console.log("关");
						$('#switch').siblings('input').val('N');




					});
				})

			}

			if (key == 'digaoweihu') {
				Do('switch', function () {
					wwkjSwitch.init();
					switchEvent("#switch", function () {
						console.log("开");
						$('#switch').siblings('input').val('Y');


					}, function () {
						console.log("关");
						$('#switch').siblings('input').val('N');




					});
				})

				if (info.orgName != '全部') {
					$('[name=fixedType]').removeAttr('title').attr('disabled', false).html('<option value="' + info.org + '">' + info.orgName + '</option>');
					Do('bootstrapSelect', function () {
						$('select').attr('title', '请选择');
						$('[name=fixedType]').selectpicker('refresh');
					})
				}

				//change
				$('body').on('change', '.j_change', function () {
					var total = $('[name="qty"]').val() * $('[name="price"]').val();
					$('[name="amount"]').val(total);
				})



			}

			if (key == 'zichankapian') {
				$('body').on('change', '.j_change', function () {
					var total = $('[name="qty"]').val() * $('[name="price"]').val();
					$('[name="amount"]').val(total);
				})


				if (info.orgName != '全部') {
					$('[name=fixedType]').removeAttr('title').attr('disabled', false).html('<option value="' + info.org + '">' + info.orgName + '</option>');
					Do('bootstrapSelect', function () {
						$('select').attr('title', '请选择');
						$('[name=fixedType]').selectpicker('refresh');
					})
				}
			}



			if (key == 'pandianjihuas') {
				Do('switch', function () {
					wwkjSwitch.init();
					switchEvent("#switch", function () {
						console.log("开");
						$('#switch').siblings('input').val('Y');

					}, function () {
						console.log("关");
						$('#switch').siblings('input').val('N');

					});
				})


				// $('.j_change').on('change',function(){

					
				// })


				
				$('body').on('change', '.j_change', function () {
					var opt = $(".j_change option:selected").val();
					//var opt = $(".j_change").val()

					if(opt=='D'){
						alert(1)
						$("#week").hide();
						$("#months").hide();
					}else if(opt=='W'){
						$("#week").show();
						$("#months").hide();
					}else{
						$("#months").show();
						$("#week").hide();
					}

				})


			}

		});

		
		$('body').on('click', '.j_add', function () {
			var str = '';
			if(key=='pandianjihuas'){
				str += '<tr>';
				str += '<td><select title="" name="" class="selectpicker form-control" data-keytype="search/base"  data-type="zichanleixing" data-tag="fixedList"></select></td>';
				str +='<td><select title="" name="" class="selectpicker form-control" data-keytype="search/base"  data-type="zichankapian" data-tag="fixedList"></select></td>';
				str +='<td class="action"><button type="button" class="btn btn-clear j_del">删除</button><i class="fa fa-caret-right"></i></td>';
				str += '</tr>';
			}
			   add(str, key);
			   setFrameHeight();
			 




		});

		// update detail
		$('body').on('click', '#j_add', function () {
			var that = $(this);

			var obj = pageXY(that[0]);
			required(1);
			var len = $('.border-color-red').not('.bootstrap-select').length;
			if (len) {
				var val = $('#levelsno').val();

				if (val === '') {
					var text = '当前组织是否为最上层组织?';
					if (key == 'bumen') {
						text = '当前部门是否为最上层部门?';
					}
					layer.confirm(text, {
						offset: [obj.top - 100, obj.left],
						btn: ['确定', '取消'] //按钮
					}, function (index) {
						$('#levelsno').html('<option class="bs-title-option" value="' + $('[name=no]').val() + '">' + $('[name=name]').val() + '</option>');
						layer.close(index);
						$('#levelsno').selectpicker('refresh');
						$('#levelsno').removeClass('border-color-red');
						$('[name=levelsnoname]').val($('[name=name]').val());

					}, function () {

					});
				} else {
					layer.alert('请输入必填项目！(*号为必填)', {
						offset: [obj.top - 100, obj.left]
					});
				}

				return;
			}

			var str = $("form").serializeObject();
			// 对层级特殊处理
			var fenlei = $('.j_fenlei');
			if (fenlei.length) {
				var fenleiVal = fenlei.val();
				var level = $('.j_levels').val();

				if (level == '1' && fenleiVal == '') {
					var no = $('[name=no]').val();
					str.levelsno = no;
				}
			}
			// 对层级特殊处理结束

			var jsonData = $.extend({}, arg, str);
			//console.log(jsonData);
			if (KEY == 'zhanghao') {
				jsonData.passwd = info.no; // 默认密码
			}

			if (KEY == 'cyszzuzhi') {
				jsonData.className = info.className;
				jsonData.classNo = info.classNo;
			}
			$.ajax({
				type: "post",
				url: Config.baseUrl + Config[key] + 'create',
				data: jsonData,
				success: function (msg) {
					var msg = JSON.parse(Tools.decrypt(msg));
					//console.log(msg);
					var obj = pageXY(that[0]);
					if (msg.retCode == '0') {
						if (msg.data.busCode == '0') {
							if (KEY == 'zuzhi') {
								var src = $('#show').attr('src');
								autoUpload(src);
							}
							layer.alert('新增成功！', {
								offset: [obj.top - 100, obj.left]
							}, function () {

								if ($('form').length == 1) {
									var href = sessionStorage.getItem('wwkj_pageUrl');
									location.href = href;
								}
								layer.closeAll();

							});
						} else {
							layer.alert(msg.data.busMsg, {
								offset: [obj.top - 100, obj.left]
							});
						}


					} else {

						layer.alert(msg.retMsg, {
							offset: [obj.top - 100, obj.left]
						}, function () {
							if (msg.retMsg == '授权数已超限') {
								var href = sessionStorage.getItem('wwkj_pageUrl');
								location.href = href;
							}
						});
					}
				}
			})

		});

		// 整体提交（头身）
		$('body').on('click', '#j_add_2', function () {
			var that = $(this);
			required(1);
			var len = $('.border-color-red').not('.bootstrap-select').length;
			if (len) {
				layer.alert('请输入必填项目！', {
					'offset': 't'
				});
				$(parent.window).scrollTop(0);
				return;
			}
			// head
			var head = $('#j_head').serialize();
			// body
			var no = $('#j_data').find('[name=no]').val();
			var bodys = $('.j_body');
			var obj = {};
			var headType = $('#j_head').data('type');

			if (key == 'shangpinziliao' || key == 'gongyingshangziliao'||key=='pandianjihuas') {
				// head

				head = $("#j_head").serializeObject();
				head = $.extend({}, globalArg, head);
				obj[headType] = head;
				// details
				for (var i = 0; i < bodys.length; i++) {
					var type = $(bodys[i]).data('type');
					obj[headType][type] = [];
					var trs = $(bodys[i]).find('tbody').find('tr');
					for (var j = 0; j < trs.length; j++) {
						var inputs = $(trs[j]).find('.form-control').not('.bootstrap-select');
						var str = {};
						for (var k = 0; k < inputs.length; k++) {
							var name = $(inputs[k]).attr('name');
							var val = $(inputs[k]).val();
							str[name] = val;
						}

						str["item"] = i;
						str["no"] = no;
						//console.log(str);
						obj[headType][type].push(str);

					}
				}
			} else {
				obj[headType] = [];
				obj[headType].push(head + '&ent=' + info.ent + '&uid=' + info.no + '&org=' + Config.org + '&orgrange=' + Config.orgrange);
				for (var i = 0; i < bodys.length; i++) {
					var type = $(bodys[i]).data('type');
					obj[type] = [];
					var trs = $(bodys[i]).find('tbody').find('tr');
					for (var j = 0; j < trs.length; j++) {
						var inputs = $(trs[j]).find('.form-control').not('.bootstrap-select');
						var str = '';
						for (var k = 0; k < inputs.length; k++) {
							var name = $(inputs[k]).attr('name');
							var val = $(inputs[k]).val();
							str += name + '=' + val + '&';
						}
						//console.log(str);
						str += 'item=' + i + '&no=' + no + '';
						obj[type].push(str);

					}
				}
			}

			//console.log(JSON.stringify(obj));

			$.ajax({
				type: "post",
				contentType: 'application/json',
				url: Config.baseUrl + Config[key + '_modle'] + createConfig[key],
				data: JSON.stringify(obj),

				success: function (msg) {
					var msg = JSON.parse(Tools.decrypt(msg));
					//console.log(msg);
					var obj = pageXY(that[0]);
					if (msg.retCode == '0') {
						if (msg.data.busCode == '0') {

							layer.alert('新增成功！', {
								offset: [obj.top - 50, obj.left - 100]
							}, function () {
								var href = sessionStorage.getItem('wwkj_pageUrl');
								location.href = href;
							});
						} else {
							layer.alert(msg.data.busMsg, {
								offset: [obj.top - 50, obj.left - 100]
							});
						}


					} else {

						layer.alert(msg.retMsg, {
							offset: [obj.top - 50, obj.left - 100]
						});
					}
				}
			})

		});




	});
});