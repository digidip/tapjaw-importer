import HtmlFormExtractor from '../html-form-extractor';

const sampleHtml = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" data-placeholder-focus="false">
<head>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Rakuten LinkShare</title>
<link href="/sso/css/sso.css" type="text/css" rel="stylesheet">
<link rel="icon" href="/sso/favicon.ico" type="image/x-icon" />
<!--  Safari page pin icon -->
<link rel="mask-icon" href="/sso/Rakuten_SafariPin.svg" color="#bf0000"/>
<link rel="mask-icon" href="/sso/Rakuten_SafariPin.svg" color="#f59600"/>
<link rel="mask-icon" href="/sso/Rakuten_SafariPin.svg" color="#00b900"/>
<link rel="mask-icon" href="/sso/Rakuten_SafariPin.svg" color="#00a0f0"/>
<link rel="mask-icon" href="/sso/Rakuten_SafariPin.svg" color="#002896"/>
<link rel="mask-icon" href="/sso/Rakuten_SafariPin.svg" color="#7d00be"/>
<link rel="mask-icon" href="/sso/Rakuten_SafariPin.svg" color="#ff41be"/>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="/sso/js/jquery.placeholder.js"></script>
<script src="/sso/js/focus.js"></script>
<script src="/sso/js/analytics.js"></script>
</head>
<body>
    <div style="height: 12px">
        <hr style="border: 0; height: 0; border-top: 12px solid rgb(0, 0, 0);">
    </div>
    <div class="form_container">
    <div style="text-align:center; margin:30px;">
            <a href="http://marketing.rakuten.com/affiliate-marketing/">
                <img src="/sso/images/RM19-Web-Horiz-COLOR-250x43px.jpg" alt="Rakuten Affiliate Network" border="0">
            </a>
    </div>
        <form id="fm1" action="/sso/login" method="post">
            <input type="hidden" name="lt" value="LT-124299922-XXkbY6bVb65WSlsdaXBbyOCFdwrflk" />
            <input type="hidden" name="execution" value="e1s1" />
            <input type="hidden" name="_eventId" value="submit" />
            <input type="hidden" name="HEALTHCHECK" value="HEALTHCHECK PASSED." />
            <div style="text-align: center; display: inline-block;">
                <div style="padding: 10px; margin-top:-20px;">
                </div>
                <div>
                    <input id="username" name="username" class="input_box" tabindex="1" placeholder="Username" type="text" value="" size="30" autocomplete="on"/>
                </div>
                <div style="margin-top:10px;">
                    <input id="password" name="password" class="input_box" tabindex="2" placeholder="Password" type="password" value="" size="30" autocomplete="on"/>
                </div>
            </div>
            <div style="margin-top:10px;text-align: center;">
                <input class="button" name="login" value="Log In" tabindex="3" type="submit">
            </div>
            <div style="padding: 15px 0px 0px 0px">
                <label>I forgot my <a href="https://cli.linksynergy.com/cli/common/forgotLoginInfo.php?action=ForgotPassword">password</a> / <a href="https://cli.linksynergy.com/cli/common/forgotLoginInfo.php?action=ForgotUsername">username</a></label>
            </div>
            <span ID=signupLink>
                <div style="padding: 15px 0px 0px 0px">
                    <label><a href="https://affiliates.walmart.com/linksharesignupnew">Sign up</a></label>
                </div>
            </span>
        </form>
    </div>
    <!--// FOOTER AREA //-->
    <div id="footerSignup" class="footerSignup">
      <a href="http://marketing.rakuten.com/who-we-are" target="_blank" >
        About Us
      </a>&nbsp;|&nbsp;<a href="http://marketing.rakuten.com/affiliate-privacy-policy" target="_blank" >
        Privacy
      </a>&nbsp;|&nbsp;<a href="http://marketing.rakuten.com/intellectual-property-policy" target="_blank" >
        Intellectual Property
      </a><br/>
      &#169;2019<label style="padding-left:2px;">Rakuten Marketing LLC. All rights reserved.</label>
      </div>
    <!--// END FOOTER AREA //-->
  </body>
</html>`;

describe('Make sure the HtmlFormBuilder can return a forms inputs/values', () => {
    test('should be able to get the root of the form', () => {
        const builder = new HtmlFormExtractor('#fm1', 'http://testing.com');
        const formFields = builder.getInputFields(sampleHtml);
        expect(formFields).toEqual({
            url: 'http://testing.com/sso/login',
            method: 'post',
            inputs: [
                {
                    name: 'lt',
                    value: 'LT-124299922-XXkbY6bVb65WSlsdaXBbyOCFdwrflk',
                    type: 'hidden'
                },
                {
                    name: 'execution',
                    value: 'e1s1',
                    type: 'hidden'
                },
                {
                    name: '_eventId',
                    value: 'submit',
                    type: 'hidden'
                },
                {
                    name: 'HEALTHCHECK',
                    value: 'HEALTHCHECK PASSED.',
                    type: 'hidden'
                },
                {
                    name: 'username',
                    value: '',
                    type: 'text'
                },
                {
                    name: 'password',
                    value: '',
                    type: 'password'
                },
                {
                    name: 'login',
                    value: 'Log In',
                    type: 'submit'
                }
            ]
        });
    });
});
