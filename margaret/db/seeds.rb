# Creating seed businesses
Business::Business.create(name: "Sam James Coffee Bar", address: "297 Harbord St, Toronto, ON M6G 1G7")
Business::Business.create(name: "Ezra's Pound", address: "238 Dupont Street, Toronto, ON M5R 1V7")
Business::Business.create(name: "Quantum Coffee", address: "460 King St W, Toronto, ON M5V 1L7")

BusinessIndex::Business.import
