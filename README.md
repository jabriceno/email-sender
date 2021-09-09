# Email Sender

![GitHub repo size](https://img.shields.io/github/repo-size/jabriceno/email-sender)
![Lines of code](https://img.shields.io/tokei/lines/github/jabriceno/email-sender)
![GitHub top language](https://img.shields.io/github/languages/top/jabriceno/email-sender)

This is an email sender, built with nodemailer. For testing, make sure you have a gmail account, as it will be used as the sender.

## Requirements

Before use, be sure to meet the following requirements:

* A gmail account whith the [less secure apps](https://myaccount.google.com/lesssecureapps)* feature enabled. (Only during testing).
* Have installed a testing API tool, like [Postman](https://www.postman.com/).
* Access to a command line terminal.

(*)  _For more info about less secure apps_ [https://support.google.com/accounts/answer/6010255
](https://support.google.com/accounts/answer/6010255)

## Getting started

* Open a terminal command line window and clone this repository

```bash
git clone https://github.com/jabriceno/email-sender.git
```

* Move to the project folder

```bash
cd email-sender
```

* Create a `.env` file, and put your gmail account data: name, account and password

```env
user=<your name>
account=<your gmail account address>
password=<your gmail account password>
```

* Install the dependencies

```bash
npm install
```

* Start the server locally

```bash
npm start
```

You'll receive a message like: `Server is running at PORT 4000`

## Usage

* Create a POST call to the service in your local server

```txt
http://localhost:4000/api/email/send
```

* In the body tab, create the _x-www-form-urlencoded_ params

| field        | value                                                                |
| ------------ | -------------------------------------------------------------------- |
| receiptName  | Name of receipt                                                      |
| receiptEmail | Email address of receipt                                             |
| subject      | Subject of email                                                     |
| template     | Template for the email ( `hello`, `welcome` or `congrats`_) |

* You can import the following call example

```bash
curl --location --request POST 'http://localhost:4000/api/email/send' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'receiptName=Jesus' \
--data-urlencode 'receiptEmail=jesusbg71@gmail.com' \
--data-urlencode 'subject=Hello' \
--data-urlencode 'template=hello'
```

* The service will respond like

```json
{
    "response": "Message sent 250 2.0.0 OK  XXXXXXXXXXXX.XXX - gsmtp",
    "receipt": <receiptEmail>
}
```

## Things to Note

* Don't forget to disable the [less secure apps](https://myaccount.google.com/lesssecureapps) access in your gmail account.
* This tool was made for learn and practice. It should not be used to send spam or fraudulent information.
