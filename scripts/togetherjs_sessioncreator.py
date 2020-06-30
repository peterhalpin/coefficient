from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.expected_conditions import presence_of_element_located
import sys

if len(sys.argv) != 3:
    sys.exit("Improper arguments supplied. Usage is: demo.py <url_to_scrape> <number_of_urls>")

# Obtain arguments.
url = sys.argv[1]       # The URL that we want to generate TogetherJS sessions for.
num = int(sys.argv[2])  # The number of URLs that we wish to generate.
url_list = []           # The list to hold all generated URLs.

# Configure path to executable Chrome browser and enable headless execution.
# Path should be an absolute path; will need to change on deployment.
chrome_driver_path = "C:\\Users\\justindo\\PycharmProjects\\Scraper\\chromedriver"
chrome_options = Options()
chrome_options.add_argument('--headless')

for x in range(0, num):
    # Open a new browser session.
    driver = webdriver.Chrome(executable_path=chrome_driver_path, options=chrome_options)

    # Set timeout time - time to wait for an element to appear before giving up and throwing error.
    wait = WebDriverWait(driver, 1)
    # Load webpage that has TogetherJS functionality.
    driver.get(url)

    # We are operating under the assumption that there is no "start" button to activate TogetherJS and it should just appear on the page.
    # Uncomment the following two lines if there is a button with ID "togetherjs-button" that is supposed to activate TogetherJS.
        #startbutton = driver.find_element_by_id("togetherjs-button")
        #startbutton.click()

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

# Will need to actually output to file or post to database to persist data for deployment.
print(url_list)
