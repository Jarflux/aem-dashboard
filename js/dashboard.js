/**
 * Created by Ben on 04/07/16.
 */
$(document).ready(function() {
    if($("#propertyTable").length > 0){
        propertyManager.start();
    }
});
var dashboardModule = (function () {

    var self =  {
        time : 0,
        start: function (url, data, button, callType) {
            var original = $(button).val();
            var feedback = $(button).closest('td').next();

            callType = callType ? callType : "GET";

            $(button).prop('disabled', true);
            $(feedback).html('<i class="fa fa-repeat fa-spin"></i> Even geduld (<span class="timer">00:00</span>)');
            $(feedback).css('color', 'orange');

            var timer = setInterval(function(){self.ajaxTimer(feedback)},1000);

            $.ajax({
                type: callType,
                url: url,
                data: data
            }).done(function () {
                $(feedback).html('<i class="fa fa-check"></i> Voltooid (<span class="timer"></span>)');
                $(feedback).css('color', 'green');
            }).error(function () {
                $(feedback).html('<i class="fa fa-times"></i> Fout opgetreden (<span class="timer"></span>)');
                $(feedback).css('color', 'red');
            }).always(function () {
                $(button).prop('disabled', false);
                $(feedback).find('.timer').html(self.toMMSS(self.time));
                clearInterval(timer);
                self.time = 0;
            });
        },
        replicateTranslations: function (button) {
            var url = "/bin/secure/batch/translation-activation";
            var original = $(button).val();
            $(button).prop('disabled', true);
            $(button).closest('td').next().html('<i class="fa fa-repeat fa-spin"></i> Even geduld');
            $(button).closest('td').next().css('color', 'orange');
            $.ajax({
                url: url
            }).done(function () {
                $(button).closest('td').next().html('<i class="fa fa-check"></i> Kopiëren gestart');
                $(button).closest('td').next().css('color', 'green');
            }).error(function () {
                $(button).closest('td').next().html('<i class="fa fa-times"></i> Fout opgetreden');
                $(button).closest('td').next().css('color', 'red');
            }).always(function () {
                $(button).prop('disabled', false);
                $(button).closest('td').next().find('.timer').html(self.toMMSS(self.time));
            });
        },
        flushCache: function (button) {
            var data = {
                "path": $("#pathToFlush").val()
            }
            $.ajax({
                url: url,
                data: data
            });
        },
        getBonuscardDate: function () {
            var date = $('#bonuscardDate').val();
            $('#bonuscardLinkDate').attr('href', '/bin/hubo/bonusCard.' + date + '.csv').get(0).click();
        },
        getNewsletterAll: function () {
            var action = $('#newsletterActionAll').val();
            $('#newsletterLinkAll').attr('href', '/bin/secure/newsletter?type=' + action + '&method=all').get(0).click();
        },
        getNewsletterNew: function () {
            var action = $('#newsletterActionNew').val();
            $('#newsletterLinkNew').attr('href', '/bin/secure/newsletter?type=' + action + '&method=new').get(0).click();
        },
        getNewsletterDate: function () {
            var action = $('#newsletterActionDate').val();
            var date = $('#newsletterDate').val();
            $('#newsletterLinkDate').attr('href', '/bin/secure/newsletter?type=' + action + '&method=date&date=' + date).get(0).click();
        },
        startFullCycle: function (tbodyId, button) {
            // empty feedback
            $('#'+tbodyId+' .cycle-feedback').html('<i class="fa fa-history fa-flip-horizontal"></i> In de wachtrij');
            $('#'+tbodyId+' .cycle-feedback').css('color','lightgrey');
            $('#'+tbodyId+' .cycle-feedback').attr('data-pending','true');

            // disable button
            $(button).prop('disabled', true);

            var count = 0;
            var list = [];

            $("tbody#"+tbodyId+" tr[data-url]").each(function(){
                list.push(this);
            });

            function sendRequests(){
                if(list[count]){
                    var tr = list[count];

                    var url = $(tr).data("url");
                    var feedback = $(tr).find(".cycle-feedback");
                    var data = '';
                    var type = "GET";

                    $(feedback).html('<i class="fa fa-repeat fa-spin"></i> Even geduld (<span class="timer">00:00</span>)');
                    $(feedback).css('color', 'orange');

                    if($(tr).find(':input').length > 0){
                        data = $(tr).find(':input').serialize();
                        type = "POST";
                    }

                    var timer = setInterval(function(){self.ajaxTimer(feedback)},1000);

                    $.ajax({
                        url: url,
                        async: true,
                        type: type,
                        data: data
                    }).success(function (data, statusText, xhr) {
                        $(feedback).html('<i class="fa fa-check"></i> Voltooid (<span class="timer"></span>)');
                        $(feedback).css('color', 'green');
                        $(feedback).removeAttr('data-pending');

                        count++;
                        sendRequests();
                    }).error(function (data, statusText, xhr) {
                        $(feedback).html('<i class="fa fa-times"></i> Fout opgetreden (<span class="timer"></span>)');
                        $(feedback).css('color', 'red');
                        $(feedback).removeAttr('data-pending');

                        // cycle end
                        $(button).prop('disabled', false);

                        $('#'+tbodyId+' .cycle-feedback[data-pending="true"]').html('').css('color','#333').removeAttr('data-pending');
                    }).always(function(){
                        clearInterval(timer);
                        $(feedback).find('.timer').html(self.toMMSS(self.time));
                        self.time = 0;
                    });
                }else{
                    // cycle end
                    $(button).prop('disabled', false);
                }
            }

            sendRequests();
        },
        ajaxTimer:function (feedback) {
            self.time++;
            $(feedback).find('.timer').html(self.toMMSS(self.time));
        },

        toMMSS: function (seconds) {
            var sec_num = parseInt(seconds, 10); // don't forget the second param
            var hours = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);

            if (hours > 0) {
                if (hours < 10) {
                    hours = "0" + hours;
                }
                hours = hours + ':';
            } else {
                hours = "";
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            var time = hours + minutes + ':' + seconds;
            return time;
        }
    };
    return self;
})();

var huboAdminApp = angular.module('huboAdminApp',[]);
huboAdminApp.controller('productStatusController', function($scope, $http) {
    $scope.search = function() {
        $http.get('/bin/secure/productstatus', {
            params: {
                sku: $scope.sku
            }
        }).success(function(data) {
            $scope.productStatuses = data;
        }).error(function() {
            alert("Geen resultaten gevonden.")
        });
    }
});