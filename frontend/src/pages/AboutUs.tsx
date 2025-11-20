import React from "react";
import Header from "../components/Header";
import { Container, Card } from "react-bootstrap";

const AboutUs = () => {
  return (
    <div className="home-page">
      <Header />
      <div className="main-content">
        <Container className="about-us-container">
          <Card className="about-us-card">
            <Card.Body>
              <h1 className="about-us-title">קצת עלינו</h1>
              
              <div className="about-us-content">
                <section className="about-us-section">
                  <h2 className="section-title">מה זה DrashaMaker?</h2>
                  <p className="section-text">
                    DrashaMaker הוא כלי חדשני ונוח ליצירת דברי תורה מותאמים אישית. 
                    האפליקציה שלנו נוצרה מתוך הבנה של הקושי הרב שיש לאנשים רבים 
                    בהכנת דבר תורה איכותי, מעניין ומתאים לאירועים שונים.
                  </p>
                </section>

                <section className="about-us-section">
                  <h2 className="section-title">למי זה מיועד?</h2>
                  <p className="section-text">
                    האפליקציה שלנו מתאימה לכל מי שמעוניין ליצור דבר תורה משמעותי 
                    ואיכותי - בין אם זה לפרשת השבוע, לבר מצווה או בת מצווה, לחתונה, 
                    לברית מילה, לזבד הבת, לפדיון הבן או לכל אירוע משפחתי אחר.
                  </p>
                </section>

                <section className="about-us-section">
                  <h2 className="section-title">איך זה עובד?</h2>
                  <p className="section-text">
                    התהליך פשוט מאוד! כל שעליכם לעשות הוא לבחור את הנושא, הסגנון 
                    והאורך הרצויים, ואנחנו נדאג ליצור עבורכם דבר תורה מותאם אישית. 
                    תוכלו לבחור בין סגנונות שונים כמו חסידי, אקטואלי, עיוני או מוסר, 
                    ולהתאים את האורך לצרכים שלכם - קצר, בינוני או ארוך.
                  </p>
                </section>

                <section className="about-us-section">
                  <h2 className="section-title">מה הופך אותנו למיוחדים?</h2>
                  <p className="section-text">
                    DrashaMaker מציע לכם חוויית שימוש נוחה ואינטואיטיבית. עם ממשק 
                    משתמש מודרני ונוח, תוכלו ליצור דבר תורה מקצועי תוך דקות ספורות. 
                    האפליקציה שלנו מבוססת על טכנולוגיה מתקדמת המאפשרת יצירת תוכן 
                    איכותי ומתאים לכל סוג של אירוע.
                  </p>
                </section>

                <section className="about-us-section">
                  <h2 className="section-title">החזון שלנו</h2>
                  <p className="section-text">
                    החזון שלנו הוא להפוך את יצירת דברי התורה לנגישה וקלה יותר עבור 
                    כל אחד. אנחנו מאמינים שכל אדם יכול ליצור דבר תורה משמעותי 
                    ואיכותי, גם ללא רקע נרחב בלימוד תורה. DrashaMaker כאן כדי לעזור 
                    לכם להביע את עצמכם בצורה הטובה ביותר באירועים החשובים בחייכם.
                  </p>
                </section>

                <section className="about-us-section">
                  <h2 className="section-title">בואו נתחיל!</h2>
                  <p className="section-text">
                    מוכנים ליצור את דבר התורה הראשון שלכם? פשוט חזרו לעמוד הראשי, 
                    בחרו את ההגדרות המתאימות לכם, ולחצו על "צור דבר תורה". תוך רגעים 
                    ספורים תקבלו דבר תורה מותאם אישית, איכותי ומוכן לשימוש.
                  </p>
                </section>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default AboutUs;

