from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.expected_conditions import presence_of_element_located
import os
import sys
import json

# Default name for AWS Lambda function is lambda_handler.
# event is the information supplied along the HTTP request.
# context is information about the process running on lambda.

def lambda_handler(event, context):
    # We pass in the url and number of groups as parameters of event.
    url = event['queryStringParameters']['url']
    groups = int(event['queryStringParameters']['groups'])

    # This is the array which will contain the generated URLs.
    url_list = []

    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--window-size=1280x1696')
    chrome_options.add_argument('--user-data-dir=/tmp/user-data')
    chrome_options.add_argument('--hide-scrollbars')
    chrome_options.add_argument('--enable-logging')
    chrome_options.add_argument('--log-level=0')
    chrome_options.add_argument('--v=99')
    chrome_options.add_argument('--single-process')
    chrome_options.add_argument('--data-path=/tmp/data-path')
    chrome_options.add_argument('--ignore-certificate-errors')
    chrome_options.add_argument('--homedir=/tmp')
    chrome_options.add_argument('--disk-cache-dir=/tmp/cache-dir')
    chrome_options.add_argument('user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36')
    chrome_options.binary_location = os.getcwd() + "/bin/headless-chromium"


    for x in range(0, groups):
        driver = webdriver.Chrome(chrome_options=chrome_options)

        wait = WebDriverWait(driver, 1)
        # Load webpage that has TogetherJS functionality.
        driver.get(url)

        # We are operating under the assumption that there is no "start" button to activate TogetherJS and it should just appear on the page.
        # Uncomment the following two lines if there is a button with ID "togetherjs-button" that is supposed to activate TogetherJS.
            # startbutton = driver.find_element_by_id("togetherjs-button")
            # startbutton.click()

        # Wait until the necessary TogetherJS elements load on page.
        wait.until(presence_of_element_located((By.ID, "togetherjs-container")))
        wait.until(presence_of_element_located((By.ID, "togetherjs-share")))
        wait.until(presence_of_element_located((By.CLASS_NAME, "togetherjs-not-mobile")))

        # Obtain the div that contains the TogetherJS session link.
        linkdata = driver.find_element_by_class_name("togetherjs-not-mobile")
        children = linkdata.find_elements_by_css_selector('*')

        # Iterate over children of div until the text box containing session link is selected.
        # Add value in text box to URL List once we reach this iteration.
        for element in children:
            if element.get_attribute('class') == 'togetherjs-share-link':
                url_list.append(element.get_attribute('value'))

        # Close the instance of the browser.
        driver.close()

    # If it worked, a success status code is returned and the list of URLs is returned in the HTTP response body.
    return {
        'statusCode': 200,
        'body': json.dumps(url_list)
    }
