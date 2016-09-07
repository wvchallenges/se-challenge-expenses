using System.Web;
using System.Web.Optimization;

namespace Wave_Challenge
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/3rdParty/jQuery/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/3rdParty.modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/3rdParty/Bootstrap/bootstrap.js",
                      "~/Scripts/3rdParty/respond/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Styles/3rdParty/Bootstrap/bootstrap.css",
                      "~/Styles/3rdParty/font-awesome-4.6.3/css/font-awesome.min.css",
                      "~/Styles/site.css"));
        }
    }
}
