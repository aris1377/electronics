// DOM fully loaded bo'lgandan keyin barcha JavaScript ishga tushadi
document.addEventListener("DOMContentLoaded", function () {
  // DOM elementlarini tanlab olish
  const processBtn = document.getElementById("process-btn");
  const cancelBtn = document.getElementById("cancel-btn");
  const dishContainer = document.querySelector(".dish-container");
  const dishStatusSelects = document.querySelectorAll(".new-product-status");
  const productTypeSelect = document.querySelector(
    "select[name='productCollection']"
  );

  // Tasvir yuklash funksiyalari
  setupImageUploads();

  // Product yaratish formasi dastlab yashirin
  dishContainer.style.display = "none";

  // Yangi mahsulot qo'shish buttonini bosish
  processBtn.addEventListener("click", function () {
    dishContainer.style.display = "block";
    // Formaga scroll qilish
    dishContainer.scrollIntoView({ behavior: "smooth" });
  });

  // Cancel buttonini bosish
  cancelBtn.addEventListener("click", function (e) {
    e.preventDefault();
    dishContainer.style.display = "none";
    // Formani tozalash
    clearForm();
    // Yuqoriga scroll qilish
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Mahsulot turini tanlash orqali ko'rinadigan inputlarni o'zgartirish
  if (productTypeSelect) {
    productTypeSelect.addEventListener("change", function () {
      toggleFieldsByProductType(this.value);
    });

    // Sahifa yuklanganida ham ishlaydi - dastlabki tanlangan qiymatga qarab
    toggleFieldsByProductType(productTypeSelect.value);
  }

  // Mahsulot statusini o'zgartirish
  dishStatusSelects.forEach((select) => {
    select.addEventListener("change", function () {
      const productId = this.id;
      const newStatus = this.value;

      // Status o'zgarishini serverga yuborish
      updateProductStatus(productId, newStatus);
    });
  });

  // Form validation
  window.validateForm = function () {
    const productName = document.querySelector(".product-name").value;
    const productPrice = document.querySelector(".product-price").value;
    const productLeftCount = document.querySelector(
      ".product-left-count"
    ).value;
    const productType = document.querySelector(
      "select[name='productCollection']"
    ).value;

    if (!productName || productName.trim() === "") {
      alert("Please enter product name");
      return false;
    }

    if (!productPrice || isNaN(productPrice) || productPrice <= 0) {
      alert("Please enter valid product price");
      return false;
    }

    if (!productLeftCount || isNaN(productLeftCount) || productLeftCount < 0) {
      alert("Please enter valid product count");
      return false;
    }

    // Mahsulot turiga qarab qo'shimcha validatsiya
    if (productType === "KIDS_TOYS") {
      const toyType = document.querySelector("select[name='toyType']").value;
      const toyColor = document.querySelector("select[name='toyColor']").value;
      const toySize = document.querySelector(
        "select[name='productToySize']"
      ).value;

      if (!toyType || !toyColor || !toySize) {
        alert("Please fill all fields for toy products");
        return false;
      }
    } else if (productType === "CLOTHING") {
      const clothingSize = document.querySelector(
        "select[name='clothingSize']"
      ).value;
      const clothingColor = document.querySelector(
        "select[name='clothingColor']"
      ).value;

      if (!clothingSize || !clothingColor) {
        alert("Please fill all fields for clothing products");
        return false;
      }
    } else if (productType === "BOOKS") {
      const bookLanguage = document.querySelector(
        "select[name='bookLanguage']"
      ).value;
      const bookCoverType = document.querySelector(
        "select[name='bookCoverType']"
      ).value;

      if (!bookLanguage || !bookCoverType) {
        alert("Please fill all fields for book products");
        return false;
      }
    }

    return true;
  };
});

// Mahsulot turiga ko'ra ko'rinadigan maydonlarni boshqarish
function toggleFieldsByProductType(type) {
  console.log(`Toggling fields for product type: ${type}`);

  // Barcha maxsus maydonlarni yashirish
  const allSpecificFieldContainers = document.querySelectorAll(
    '.half-input:has(select[name="toyType"]), ' +
      '.half-input:has(select[name="toyColor"]), ' +
      '.half-input:has(select[name="productToySize"]), ' +
      '.half-input:has(select[name="clothingSize"]), ' +
      '.half-input:has(select[name="clothingColor"]), ' +
      '.half-input:has(select[name="bookLanguage"]), ' +
      '.half-input:has(select[name="bookCoverType"])'
  );

  // Modern browserlarda :has selector ishlamasligi mumkin, shuning uchun alternativ variant
  if (allSpecificFieldContainers.length === 0) {
    // Barcha .half-input elementlarini tekshirib chiqamiz
    const allHalfInputs = document.querySelectorAll(".half-input");
    allHalfInputs.forEach((container) => {
      // Har bir konteynerda bitta select mavjud deb taxmin qilamiz
      const selectElement = container.querySelector("select");
      if (selectElement) {
        const name = selectElement.getAttribute("name");
        // Bizning mahsus maydonlardan biri ekanligini tekshiramiz
        if (
          [
            "toyType",
            "toyColor",
            "productToySize",
            "clothingSize",
            "clothingColor",
            "bookLanguage",
            "bookCoverType",
          ].includes(name)
        ) {
          container.style.display = "none";
        }
      }
    });
  } else {
    allSpecificFieldContainers.forEach((container) => {
      container.style.display = "none";
    });
  }

  // Tanlangan turga qarab kerakli maydonlarni ko'rsatish
  switch (type) {
    case "KIDS_TOYS":
      // O'yinchoqlar uchun kerakli maydonlarni ko'rsatish
      showFieldByName("toyType");
      showFieldByName("toyColor");
      showFieldByName("productToySize");
      console.log("Showing toy fields");
      break;

    case "CLOTHING":
      // Kiyimlar uchun kerakli maydonlarni ko'rsatish
      showFieldByName("clothingSize");
      showFieldByName("clothingColor");
      console.log("Showing clothing fields");
      break;

    case "BOOKS":
      // Kitoblar uchun kerakli maydonlarni ko'rsatish
      showFieldByName("bookLanguage");
      showFieldByName("bookCoverType");
      console.log("Showing book fields");
      break;

    default:
      // "OTHER" kategoriyasi uchun qo'shimcha maydonlar yo'q
      console.log("No specific fields for type:", type);
      break;
  }
}

// Maydonni nomi bo'yicha ko'rsatish uchun yordamchi funksiya
function showFieldByName(fieldName) {
  const field = document.querySelector(`select[name="${fieldName}"]`);
  if (field) {
    const parentDiv = field.closest(".half-input");
    if (parentDiv) {
      parentDiv.style.display = "block";
      console.log(`Field shown: ${fieldName}`);
    } else {
      console.warn(`Parent .half-input not found for field: ${fieldName}`);
    }
  } else {
    console.warn(`Field not found: ${fieldName}`);
  }
}

// Mahsulot statusini yangilash
function updateProductStatus(productId, newStatus) {
  // AJAX so'rov yasash
  fetch("/admin/product/update-status", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: productId,
      status: newStatus,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Status update failed");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Status updated successfully:", data);
      // Agar status DELETE bo'lsa, elementni ko'rinishini o'zgartirish
      if (newStatus === "DELETE") {
        const row = document.getElementById(productId).closest("tbody");
        if (row) {
          row.style.opacity = "0.5";
        }
      }
    })
    .catch((error) => {
      console.error("Error updating status:", error);
      alert("Error updating product status. Please try again.");
    });
}

// Tasvir yuklash uchun funksiya
function setupImageUploads() {
  const imageInputs = [
    {
      input: document.querySelector(".image-one"),
      preview: document.getElementById("image-section-1"),
    },
    {
      input: document.querySelector(".image-two"),
      preview: document.getElementById("image-section-2"),
    },
    {
      input: document.querySelector(".image-three"),
      preview: document.getElementById("image-section-3"),
    },
    {
      input: document.querySelector(".image-four"),
      preview: document.getElementById("image-section-4"),
    },
    {
      input: document.querySelector(".image-five"),
      preview: document.getElementById("image-section-5"),
    },
  ];

  imageInputs.forEach((item, index) => {
    if (item.input && item.preview) {
      item.input.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            item.preview.src = e.target.result;
            item.preview.style.width = "100%";
            item.preview.style.height = "100%";
            item.preview.style.objectFit = "cover";
          };
          reader.readAsDataURL(file);
        }
      });
    }
  });
}

// Formani tozalash
function clearForm() {
  document.querySelector(".product-name").value = "";
  document.querySelector(".product-price").value = "";
  document.querySelector(".product-left-count").value = "";
  document.querySelector(".product-desc").value = "";

  // Select elementlarni boshlang'ich qiymatlariga qaytarish
  const selects = document.querySelectorAll("select");
  selects.forEach((select) => {
    select.selectedIndex = 0;
  });

  // Rasmlarni boshlang'ich holatiga qaytarish
  const imagePreviews = document.querySelectorAll(".upload-img-box img");
  imagePreviews.forEach((img) => {
    img.src = "/img/upload.svg";
    img.style.width = "";
    img.style.height = "";
    img.style.objectFit = "";
  });

  // File inputlarni tozalash
  const fileInputs = document.querySelectorAll("input[type='file']");
  fileInputs.forEach((input) => {
    input.value = "";
  });

  // Tozalagandan so'ng, hozirgi tanlangan mahsulot turiga qarab kerakli maydonlarni ko'rsatish
  const currentProductType = document.querySelector(
    "select[name='productCollection']"
  ).value;
  toggleFieldsByProductType(currentProductType);
}
