$(function(){
    $('form').submit(function(e){
        e.preventDefault();
        var $this = $(this);
        if ($this.data('posting')) {
            return;
        }
        $('form input, form textarea, form select').trigger('change');
        if ($('form .has-error').length) {
            return;
        } else {
            $('form .alert').remove();
        }
        $this.data('posting', true);
        $.ajax({
            'type': 'POST', 
            'url': $this.attr('action'),
            'data': $this.serialize(),
            'dataType': 'json',
            'success': function(resp){
                if (!resp.success) {
                    if (resp.data.length == 0) {
                        $('form .form-group').first().before(Utils.alert.html(resp.message, 'warning'));
                    } else {
                        //alert(resp.data.join(','));
                        $.each(resp.data, function(i, errorMsg){
                            var $item = $('#'+i);
                            var $parent = $item.closest('div');
                            Utils.formVerifyStatus.add($parent[0], $item[0], 'error', errorMsg);
                        });
                    }
                    return;
                }
                if (resp.data['id']) {
                    addBlessMessage(resp.data, false);
                }
                resetForm();
                $('.alertModal .modal-body').html(resp.message);
                $('.alertModal').modal('show');
            },
            'complete': function(xhr, textStatus){
                $this.data('posting', false);
            }
        });
        return false;
    });

    loadBless();

    $('.see-more-bless').on('click', function(e){
        if (!$(this).data('noMore')) {
            loadBless();
        }
    });

    $('form input#userName').on('change', function(){
        var userName = $.trim($(this).val());
        if(userName.length){
            Utils.formVerifyStatus.add(false, this, 'success');
        } else {
            Utils.formVerifyStatus.add(false, this, 'error', '请填写您的姓名。');
            $(this).focus();
        }
    });

    $('form select').on('change', function(){
        var value = $(this).val();
        if (value) {
            Utils.formVerifyStatus.remove(false, this);
        }
    });
});

function resetForm(){
    var $form = $('form');
    $('form input, form textarea').each(function(){
        $(this).val('');
        Utils.formVerifyStatus.remove(false, this);
    });
    $('form select').each(function(){
        $('option', $(this)).first().attr("selected",true);
        Utils.formVerifyStatus.remove(false, this);
    });
}

function loadBless(){
    var params = {max_bless_id: 0};
    var last_card = $('ul#msglist section.bless-card').last();
    if (last_card.length) {
        params.max_bless_id = last_card.data('id');
    }

    $.getJSON('blesses.php', params, function(resp){
        if (!resp.success || !resp.has_more) {
            $('.see-more-bless').text('没有啦！');
            $('.see-more-bless').data('noMore', true);
            $('.see-more-bless').removeClass('hidden')
        }
        if (!resp.success) {
            return;
        }
        $.each(resp.data, function(i, item){
            addBlessMessage(item, true);
        });        

        $('ul#msglist li').length == 0 && $('.no-bless').removeClass('hidden');
        $('ul#msglist li').length > 0 && $('.see-more-bless').removeClass('hidden');
    });
        
        
}

function addBlessMessage(item, append) {
    append = append ? true : false;

    var item_html = $("#template").html();
    item_html = item_html.replace('{{bless_id}}', item.id);
    item_html = item_html.replace('{{created_at}}', item.created_at);
    item_html = item_html.replace('{{bless_msg}}', item.message);
    item_html = item_html.replace('{{username}}', item.name);
    if (append) {
        $('ul#msglist').append(item_html);
    } else {
        $('ul#msglist').prepend(item_html);
    }
}
