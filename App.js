import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // Türkiye istatistik verilerini tutmak için bir state tanımlanır
  const [turkeyStats, setTurkeyStats] = useState(null);

  useEffect(() => {
    // API isteği yapacak olan fonksiyon
    const fetchData = async () => {
      try {
        // API'ye istek yapılır ve yanıt beklenir
        const response = await axios.get(
          "https://api.collectapi.com/corona/countriesData",
          {
            headers: {
              "Content-Type": "application/json",
              authorization:
                "apikey 5kJcsONPIy9MVNK2sI6Oe7:45nu7BxRAjOEE6MvnzUSYs",
            },
          }
        );

        // API yanıtı konsola yazdırılır
        console.log("API Response:", response.data);

        // Türkiye verileri, API yanıtındaki ülke verileri arasında aranarak bulunur
        const turkeyData = response.data.result.find(
          (country) => country.country === "Turkey"
        );

        // Türkiye istatistik verileri state'e atanır
        setTurkeyStats(turkeyData);
      } catch (error) {
        // API isteği sırasında bir hata olursa konsola yazdırılır
        console.error("API request error:", error);
      }
    };

    // Sayfa yüklendiğinde API isteği yapılır,güncellenir
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Türkiye COVID-19 İstatistikleri</h1>
      {turkeyStats ? (
        <ul>
          <li>Toplam Vaka: {turkeyStats.totalCases}</li>
          <li>Toplam Ölüm: {turkeyStats.totalDeaths}</li>
          <li>Toplam İyileşen: {turkeyStats.totalRecovered}</li>
        </ul>
      ) : (
        /*Veriler henüz yüklenmediyse yükleme mesajı gösterilir*/
        <p>Veriler yükleniyor...</p>
      )}
    </div>
  );
}

export default App;
